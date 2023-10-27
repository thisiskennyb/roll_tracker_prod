from django.urls import path

from . import views

urlpatterns = [

path('', views.PCGSCoinAPIView.as_view(), name='coin-details'),

]