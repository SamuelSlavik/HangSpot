from django.urls import path

from .views import (
    get_user_achievements_view,
)

urlpatterns = [
    path('get/', get_user_achievements_view, name='achievements_user_get'),
]
