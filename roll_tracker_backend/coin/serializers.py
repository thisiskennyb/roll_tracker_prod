from rest_framework import serializers
from .models import Coin  

class CoinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coin
        fields = '__all__'


class YearSerializer(serializers.Serializer):
    years = serializers.ListField(child=serializers.IntegerField())