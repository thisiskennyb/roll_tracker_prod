from rest_framework import serializers
from .models import CoinCollection


class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoinCollection
        fields = '__all__'