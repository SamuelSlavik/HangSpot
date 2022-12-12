from itertools import chain

from django.http.response import JsonResponse

from rest_framework import generics
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view

from .models import SpotCommon, SkateSpot, BMXSpot, WalkSpot, PicnicSpot, SunsetSpot, SpotType
from .serializers import (
    SpotSerializer,
    SpotTypeSerializer,
    SkateSpotSerializer,
    BMXSpotSerializer,
    WalkSpotSerializer,
    PicnicSpotSerializer,
    SunsetSpotSerializer,
)


# Create your views here.
class SpotListView(generics.ListAPIView):
    """
    Lists all spots
    """
    queryset = SpotCommon.objects.all()
    serializer_class = SpotSerializer


@api_view(['POST'])
def spot_create_view(request, *args, **kwargs):
    """
    Creates spot
    """
    if request.method == 'POST':
        data = JSONParser().parse(request)
        type_name = data.get('spot_type')
        try:
            type_serializer = SpotTypeSerializer(SpotType.objects.get(pk=type_name))
            serializer_class = type_serializer.get_spot_serializer_class()
            if serializer_class is None:
                return JsonResponse({'Error': f'Unknown spot type {type_name}'}, status=400)
            serializer = serializer_class(data=data)
            if serializer.is_valid():
                spot = serializer.save(commit=False)
                spot.owner = request.user
                spot.save()
                return JsonResponse(serializer.data, status=201)
            return JsonResponse(serializer.errors, status=400)
        except SpotType.DoesNotExist:
            return JsonResponse({'Error': 'Spot type missing'}, status=400)


# TODO enable updating spot type
class SpotRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    def get_serializer_class(self):
        try:
            spot_type = SpotCommon.objects.get(pk=self.kwargs['pk']).spot_type
            spot_type_serializer = SpotTypeSerializer(spot_type)
            serializer_class = spot_type_serializer.get_spot_serializer_class()
            if serializer_class is None:
                raise NotFound(detail='Unknown spot type')
            return serializer_class
        except (SpotCommon.DoesNotExist, KeyError):
            raise NotFound(detail='Spot not found')

    def get_queryset(self):
        qs = SkateSpot.objects.filter(pk=self.kwargs['pk'])
        if qs.exists():
            return qs
        qs = BMXSpot.objects.filter(pk=self.kwargs['pk'])
        if qs.exists():
            return qs
        qs = WalkSpot.objects.filter(pk=self.kwargs['pk'])
        if qs.exists():
            return qs
        qs = PicnicSpot.objects.filter(pk=self.kwargs['pk'])
        if qs.exists():
            return qs
        qs = SunsetSpot.objects.filter(pk=self.kwargs['pk'])
        if qs.exists():
            return qs
        return NotFound()


class SpotFilterTypeListView(generics.ListAPIView):
    serializer_class = SpotSerializer

    def get_queryset(self):
        spot_type = self.kwargs['spot_type']
        if spot_type == 'all':
            return SpotCommon.objects.all()
        return SpotCommon.objects.filter(spot_type__type_name=spot_type)


class SpotDestroyView(generics.DestroyAPIView):
    queryset = SpotCommon.objects.all()
    serializer_class = SpotSerializer


class SpotTypeListView(generics.ListAPIView):
    serializer_class = SpotTypeSerializer

    def get_queryset(self):
        return SpotType.objects.all()
