from django.shortcuts import render
from rest_framework import generics

from .models import User
from .serializers import UserSerializer


# Create your views here.
class UserListView(generics.ListAPIView):
    """
    Lists all users
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserCreateView(generics.CreateAPIView):
    """
    Creates new user
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserRetrieveUpdateView(generics.RetrieveUpdateAPIView):
    """
    Use:
    GET - to get specific user;
    PUT - to update all user data;
    PATCH - to update only passed data;
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDestroyView(generics.DestroyAPIView):
    """
    Deletes user
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
