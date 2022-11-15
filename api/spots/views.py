from django.shortcuts import render
from rest_framework import generics

from .models import Spot
from .serializers import SpotSerializer


# Create your views here.
class SpotListView(generics.ListAPIView):
    queryset = Spot.objects.all()
    serializer_class = SpotSerializer
