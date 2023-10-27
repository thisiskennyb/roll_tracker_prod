from django.urls import path
from .views import CollectionAPIView, RemoveFromCollection
urlpatterns = [
path('', CollectionAPIView.as_view(), name='view_collection'),
path('add/', CollectionAPIView.as_view(), name='add_to_collection'),
path('remove/', RemoveFromCollection.as_view(), name='remove_coin')
# path('remove/<str:movie_id>/', RemoveFromWatchlist.as_view(),),
]