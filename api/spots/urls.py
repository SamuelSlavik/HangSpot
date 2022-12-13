from django.urls import path
from .views import (
    SpotListView,
    SpotFilterTypeListView,
    SpotFilterUserListView,
    SpotTypeListView,
    spot_create_view,
    SpotRetrieveUpdateView,
    SpotDestroyView,
    LikeSpotView,
    ReportSpotView,
    DisplaySpotView,
    DisplaySpotImagesView,
    UploadSpotImagesView,
    DestroySpotImagesView
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
    path('reports/<str:pk>/', ReportSpotView.as_view(), name='spots_report_give_get'),
    path('displays/<str:pk>/', DisplaySpotView.as_view(), name='spots_display_give_get'),
    path('images/get/<str:pk>/', DisplaySpotImagesView.as_view(), name='spots_display_images'),
    path('images/upload/<str:pk>/', UploadSpotImagesView.as_view(), name='spots_upload_images'),
    path('images/destroy/<str:spot>/', DestroySpotImagesView.as_view(), name='spots_destroy_images'),
]
