from django.shortcuts import render
from rest_framework import generics

from .models import SpotCommon, SkateSpot, SpotType
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


class SpotCreateView(generics.CreateAPIView):
    """
    Creates spot
    """
    def get_serializer_class(self):
        data = self.request.POST
        type_name = data.get('spot_type')
        try:
            type_serializer = SpotTypeSerializer(SpotType.objects.get(type_name=type_name))
            return type_serializer.get_spot_serializer_class()
        except SpotType.DoesNotExist:
            return SkateSpotSerializer


class SpotFilterTypeListView(generics.ListAPIView):
    serializer_class = SpotSerializer

    def get_queryset(self):
        spot_type = self.kwargs['spot_type']
        return SpotCommon.objects.filter(spot_type__type_name=spot_type)


class SpotTypeListView(generics.ListAPIView):
    serializer_class = SpotTypeSerializer

    def get_queryset(self):
        return SpotType.objects.all()
