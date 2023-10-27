from rest_framework.generics import CreateAPIView
from django.contrib.auth.models import User
from .serializers import SignupSerializer, UserProfileSerializer
from rest_framework.permissions import AllowAny
from .models import UserProfile
from rest_framework import status
from rest_framework.response import Response
from decimal import Decimal
from django.http import JsonResponse
import json


# handles request and parses body for username and password
class SignupView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = SignupSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        if serializer.is_valid():
            username = serializer.validated_data["username"]
            password = serializer.validated_data["password"]
            #create_user is special method. must be used to create user
            user = User.objects.create_user(username=username, password=password)
            user_profile = UserProfile(user=user)
            user_profile.save()

class UserProfileView(CreateAPIView):
    def get(self, request):
        user = request.user  # Get the currently logged-in user
        try:
            profile = UserProfile.objects.get(user=user)
            # Serialize the user's profile data, including coin_collection, dollar_value_searched, and user_score
            serializer = UserProfileSerializer(profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except UserProfile.DoesNotExist:
            return Response({'message': 'User profile not found.'}, status=status.HTTP_404_NOT_FOUND)      

class UpdateSearchValueAPIView(CreateAPIView):
    def post(self, request):
        user = request.user  
        data = request.data
        try:
            profile = UserProfile.objects.get(user=user)
            coin_hunt_value = Decimal(data.get('coin_hunt_value', 0))  # Extract the value to add from the request data
            points_earned = data.get('points_earned')
            # Call the method to update dollar_value_searched
            profile.add_to_dollar_value_searched(coin_hunt_value, points_earned)
            return Response({'dollar_value_searched': profile.dollar_value_searched, 'total_points_earned': profile.user_score}, status=status.HTTP_200_OK)
        except UserProfile.DoesNotExist:
            return Response({'message': 'User profile not found.'}, status=status.HTTP_404_NOT_FOUND)

class UpdateScoreView(CreateAPIView):
    def post(self, request):
        if request.method == 'POST':
            try:
                # Parse the JSON data from the request body
                data = json.loads(request.body)

                # Get the new score value from the JSON data
                new_score = data.get('new_score', None)

                if new_score is not None:
                    # Get the user's profile
                    user_profile = request.user.userprofile

                    # Update the user's score
                    user_profile.user_score -= new_score
                    user_profile.save()

                    return JsonResponse({'message': 'User score updated successfully'})

            except json.JSONDecodeError:
                return JsonResponse({'error': 'Invalid JSON data'})

        return JsonResponse({'error': 'Invalid request'})






