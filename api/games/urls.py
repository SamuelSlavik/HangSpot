from django.urls import path

from .views import (
    get_random_game_spot_view,
    get_game_result_view
)

urlpatterns = [
    path('question/<str:game_name>/', get_random_game_spot_view, name='games_get_random_spot'),
    path('result/<str:game_name>/', get_game_result_view, name='games_get_result'),
]
