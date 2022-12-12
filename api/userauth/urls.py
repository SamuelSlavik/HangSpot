from django.urls import path
from .views import (
    UserListView,
    UserCreateView,
    UserRetrieveUpdateView,
    UserDestroyView,
    TokenObtainPairUserView,
    TokenRefreshUserView,
    TokenCheckUserView,
)

# /api/[these urls]
urlpatterns = [
    path('', UserListView.as_view(), name='users_get_all'),
    # LOGIN
    path('token/', TokenObtainPairUserView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshUserView.as_view(), name='token_refresh'),
    path('token/check/', TokenCheckUserView.as_view(), name='token_check'),
    # CRUD USER
    path('create/', UserCreateView.as_view(), name='users_create'),
    path('get/<str:pk>/', UserRetrieveUpdateView.as_view(), name='users_retrieve_update'),
    path('destroy/<str:pk>/', UserDestroyView.as_view(), name='users_destroy'),
]
