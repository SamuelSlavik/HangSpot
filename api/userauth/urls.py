from django.contrib import admin
from django.urls import path
from .views import UserListView

urlpatterns = [
    path('', UserListView.as_view(), name='users_get_all'),
]
