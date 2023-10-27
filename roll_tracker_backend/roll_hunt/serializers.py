from rest_framework import serializers
from .models import RollHunt  

class HuntSerializer(serializers.ModelSerializer):
    class Meta:
        model = RollHunt
        fields = '__all__'