from rest_framework.response import Response
from rest_framework import status
from .serializers import HuntSerializer
from rest_framework.generics import CreateAPIView
from django.contrib.auth.models import User
from .models import RollHunt


class RollHuntAPIView(CreateAPIView):
    def get(self, request):
        user_profile = request.user.userprofile  # Get the currently logged-in user
        try:
            all_hunts = RollHunt.objects.filter(user_profile=user_profile)
            # Serialize the user's profile data, including coin_collection, dollar_value_searched, and user_score
            serializer = HuntSerializer(all_hunts, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except RollHunt.DoesNotExist:
            return Response({'message': 'No logged Hunts'}, status=status.HTTP_404_NOT_FOUND)      
 
    def post(self, request):
        user_profile = request.user.userprofile  
        data = request.data
        total_point_value = data.get('total_point_value')
        hunt_dollar_value = data.get('hunt_dollar_value')
        try:
            roll_hunt = RollHunt.objects.create(
                user_profile=user_profile,
                total_point_value=total_point_value,
                hunt_dollar_value=hunt_dollar_value
            )
            return Response({'Succesfully Logged': total_point_value}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=400)