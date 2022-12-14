from django.urls import path

from .views import (
    get_image_data_view,
    get_user_image_data_view
)

urlpatterns = [
    path('spot/<str:pk>/', get_image_data_view, name='get_spot_image_data'),
    path('user/<str:pk>/', get_user_image_data_view, name='get_user_image_data'),
]
