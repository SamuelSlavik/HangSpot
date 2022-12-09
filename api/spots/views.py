from django.shortcuts import render
from rest_framework import generics

from .models import SpotCommon, SkateSpot, SpotType
from .serializers import SpotSerializer, SpotTypeSerializer


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
    def get_queryset(self):
        return super().get_queryset()

    def get_serializer_class(self):
        return super().get_serializer_class()


class SpotFilterTypeListView(generics.ListAPIView):
    serializer_class = SpotSerializer

    def get_queryset(self):
        spot_type = self.kwargs['spot_type']
        return SpotCommon.objects.filter(spot_type__type_name=spot_type)


class SpotTypeListView(generics.ListAPIView):
    serializer_class = SpotTypeSerializer

    def get_queryset(self):
        return SpotType.objects.all()
