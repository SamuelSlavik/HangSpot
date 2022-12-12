from django.urls import path
from .views import SpotListView, SpotFilterTypeListView, SpotTypeListView, spot_create_view, SpotRetrieveUpdateView

urlpatterns = [
    path('', SpotListView.as_view(), name='spots_list_all'),
    path('create/', spot_create_view, name='spots_create'),
    path('get/<str:pk>/', SpotRetrieveUpdateView.as_view(), name='spots_retrieve_update'),
    path('filter/<str:spot_type>/', SpotFilterTypeListView.as_view(), name='spots_list_filtered_type'),
    path('types/', SpotTypeListView.as_view(), name='spots_list_types'),
]
