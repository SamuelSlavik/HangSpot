from django.urls import path
from .views import UserListView, UserCreateView, UserRetrieveUpdateView, UserDestroyView

urlpatterns = [
    path('', UserListView.as_view(), name='users_get_all'),
    path('create/', UserCreateView.as_view(), name='users_create'),
    path('get/<str:pk>/', UserRetrieveUpdateView.as_view(), name='users_retrieve_update'),
    path('destroy/<str:pk>/', UserDestroyView.as_view(), name='users_destroy'),
]
