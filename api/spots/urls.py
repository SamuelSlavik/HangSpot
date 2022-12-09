from django.urls import path
from .views import SpotListView, SpotFilterTypeListView, SpotTypeListView

urlpatterns = [
    path('', SpotListView.as_view(), name='spots_list_all'),
    path('filter/<str:spot_type>/', SpotFilterTypeListView.as_view(), name='spots_list_filtered_type'),
    path('types/', SpotTypeListView.as_view(), name='spots_list_types'),
]
