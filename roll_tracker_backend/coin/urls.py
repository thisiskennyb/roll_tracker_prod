from django.urls import path
from . import views

urlpatterns = [
    path('years/', views.YearAPIView.as_view(), name='year-list'),
    path('list/', views.CoinAPIView.as_view(), name='coin-list'),  
    path('<int:pk>/', views.CoinAPIView.as_view(), name='coin-detail'), 
]