from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import SignupView, UserProfileView, UpdateSearchValueAPIView, UpdateScoreView

urlpatterns = [
    path('get-token', obtain_auth_token),
    path('signup', SignupView.as_view()),
    path('user-profile/', UserProfileView.as_view(), name='user-score'),
    path('add-hunt-value/', UpdateSearchValueAPIView.as_view(), name='searched-value' ),
    path('update-score/', UpdateScoreView.as_view(), name='update-score')
]