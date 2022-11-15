from django.shortcuts import render
from rest_framework import generics

from .models import Spot, SkateSpot, SpotType
from .serializers import SpotSerializer, SpotTypeSerializer


# Create your views here.
class SpotListView(generics.ListAPIView):
    queryset = Spot.objects.all()
    serializer_class = SpotSerializer


class SpotFilterTypeListView(generics.ListAPIView):
    serializer_class = SpotSerializer

    def get_queryset(self):
        spot_type = self.kwargs['spot_type']
        return Spot.objects.filter(spot_type=spot_type)


class SpotTypeListView(generics.ListAPIView):
    serializer_class = SpotTypeSerializer

    def get_queryset(self):
        print("hello")
        return SpotType.objects.all()
