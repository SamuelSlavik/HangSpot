from django.contrib import admin
from django.urls import path
from .views import SpotListView

urlpatterns = [
    path('', SpotListView.as_view(), name='users_get_all'),
]
