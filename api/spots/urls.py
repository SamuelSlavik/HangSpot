from django.urls import path
from .views import (
    SpotListView,
    SpotFilterTypeListView,
    SpotFilterUserListView,
    SpotTypeListView,
    spot_create_view,
    SpotRetrieveUpdateView,
    SpotDestroyView,
    LikeSpotView
)

urlpatterns = [
    path('', SpotListView.as_view(), name='spots_list_all'),
    path('create/', spot_create_view, name='spots_create'),
    path('get/<str:pk>/', SpotRetrieveUpdateView.as_view(), name='spots_retrieve_update'),
    path('destroy/<str:pk>/', SpotDestroyView.as_view(), name='spots_destroy'),
    path('filter/<str:spot_type>/', SpotFilterTypeListView.as_view(), name='spots_list_filtered_type'),
    path('user/<str:user_id>/', SpotFilterUserListView.as_view(), name='spots_list_filtered_user'),
    path('types/', SpotTypeListView.as_view(), name='spots_list_types'),
    path('likes/<str:pk>/', LikeSpotView.as_view(), name='spots_like_give_get'),
]
