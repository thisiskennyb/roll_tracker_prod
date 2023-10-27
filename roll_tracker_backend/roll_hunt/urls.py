from django.urls import path
from . import views

urlpatterns = [
    path('hunt-log/', views.RollHuntAPIView.as_view(), name='hunt-log'),
]