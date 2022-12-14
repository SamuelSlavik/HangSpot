from django.shortcuts import render
from rest_framework import generics
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from rest_framework_simplejwt.serializers import (
    TokenObtainPairSerializer,
    TokenRefreshSerializer,
    TokenVerifySerializer,
)

from .models import User
from .serializers import UserSerializer, UserObtainTokenPairSerializer


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
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class UserDestroyView(generics.DestroyAPIView):
    """
    Deletes user
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class TokenObtainPairUserView(TokenObtainPairView):
    serializer_class = UserObtainTokenPairSerializer


class TokenRefreshUserView(TokenRefreshView):
    serializer_class = TokenRefreshSerializer


class TokenCheckUserView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

