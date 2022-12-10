from django.shortcuts import render
from rest_framework import generics
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


class UserDestroyView(generics.DestroyAPIView):
    """
    Deletes user
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer


class TokenObtainPairUserView(TokenObtainPairView):
    serializer_class = UserObtainTokenPairSerializer


class TokenRefreshUserView(TokenRefreshView):
    serializer_class = TokenRefreshSerializer


class UserCurrentUserView(generics.RetrieveAPIView):
    """
    Gets currently logged-in user
    """
    permission_classes = [
        IsAuthenticated,
    ]
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get(self, request, *args, **kwargs):
        token = request.data.get('token')
        user_id = AccessToken(token)
        user = self.queryset.get(id=user_id)
        return self.serializer_class(user).data
