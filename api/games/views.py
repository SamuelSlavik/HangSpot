import random
import numpy as np

from rest_framework.decorators import api_view
from rest_framework.response import Response

from spots.models import SpotCommon, SpotImage

from .serializers import (
    SpotFinderSpotSerializer,
    SpotFinderResultSerializer
)
from userauth.models import User


def _get_game_serializer_class(name):
    game_serializers = {
        'spotfinder': SpotFinderSpotSerializer
    }

    for game_name, serializer_class in game_serializers.items():
        if name == game_name:
            return serializer_class
    return None


def _get_game_result_serializer_class(name):
    game_serializers = {
        'spotfinder': SpotFinderResultSerializer
    }

    for game_name, serializer_class in game_serializers.items():
        if name == game_name:
            return serializer_class
    return None


@api_view(['GET'])
def get_random_game_spot_view(request, *args, **kwargs):
    game_name = kwargs.pop('game_name')

    serializer_class = _get_game_serializer_class(game_name)
    print(serializer_class)
    if serializer_class is None:
        return Response({'detail': 'Invalid game name received'}, status=400)

    spot_ids = list()
    spot_count = 0
    spot_image_qs = SpotImage.objects.all()
    for image in spot_image_qs:
        if image.spot.id not in spot_ids:
            spot_ids.append(image.spot.id)
            spot_count += 1
    if spot_count == 0:
        return Response({'detail': 'No valid spot for this game found'}, status=500)

    chosen_spot_id = spot_ids[random.randint(0, spot_count - 1)]
    chosen_spot = SpotCommon.objects.get(pk=chosen_spot_id)
    chosen_spot_serializer = serializer_class(chosen_spot, context={'request': request})
    return Response(chosen_spot_serializer.data, status=200)


def _get_spotfinder_result(request, serializer_class):
    data = request.data
    spot_id = data.get('spot_id')
    spot = SpotCommon.objects.get(pk=spot_id)
    lat_real = float(spot.latitude)
    lng_real = float(spot.longitude)
    lat_guess = float(data.get('latitude'))
    lng_guess = float(data.get('longitude'))
    r = 6371e3
    fi_1 = np.radians(lat_real)
    fi_2 = np.radians(lat_guess)
    fi_delta = np.radians(lat_guess - lat_real)
    la_delta = np.radians(lng_guess - lng_real)

    a = np.square(np.sin(fi_delta / 2)) + np.cos(fi_1) * np.cos(fi_2) * np.square(np.sin(la_delta))
    c = 2 * np.arctan2(np.sqrt(a), np.sqrt(1 - a))

    distance = np.divide(r * c, 1000)

    result = 5000 * np.power(np.e, np.divide(distance, -2000))
    result_dict = {
        'points': int(np.round(result)),
        'distance': np.round(distance, 3),
        'real_coordinates': {
            'latitude': lat_real,
            'longitude': lng_real,
        },
        'guess_coordinates': {
            'latitude': lat_guess,
            'longitude': lng_guess,
        },
    }
    serializer = serializer_class(result_dict)

    if request.user.is_authenticated:
        _update_spotfinder_stats(result_dict, request.user.id)

    return serializer


@api_view(['POST'])
def get_game_result_view(request, *args, **kwargs):
    game_name = kwargs.pop('game_name')
    serializer_class = _get_game_result_serializer_class(game_name)
    serializer = _get_spotfinder_result(request, serializer_class)

    return Response(serializer.data, status=200)


def _update_spotfinder_stats(result, user_id):
    user = User.objects.get(pk=user_id)
    points = result['points']
    user.geo_total += points
    if points > user.geo_record:
        user.geo_record = points
    user.save()

