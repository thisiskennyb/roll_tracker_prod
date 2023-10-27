from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User
from accounts.models import UserProfile
from coin.models import Coin
from rest_framework import serializers


class SignupSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "password"]

class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        fields = ('dollar_value_searched', 'user_score')