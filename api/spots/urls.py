from django.urls import path
from .views import SpotListView, SpotFilterTypeListView, SpotTypeListView

urlpatterns = [
    path('', SpotListView.as_view(), name='users_get_all'),
    path('<str:spot_type>/', SpotFilterTypeListView.as_view(), name='users_get_all'),
    path('types/', SpotTypeListView.as_view(), name='users_get_all'),
]
