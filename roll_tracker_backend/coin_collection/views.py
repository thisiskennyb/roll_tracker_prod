from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from accounts.models import UserProfile
from coin.models import Coin
from .serializers import CollectionSerializer
from .models import CoinCollection

class CollectionAPIView(APIView):
    def get(self, request):
        # Get the user associated with the current request
        user = request.user
        # Query the CoinCollection table for the user's collection
        coin_collection = CoinCollection.objects.filter(user_profile__user=user).order_by('-year')
        # You can now serialize the data and return it as a JSON response
        serialized_data = CollectionSerializer(coin_collection, many=True)  # Replace YourSerializer with your actual serializer
        return Response(serialized_data.data, status=status.HTTP_200_OK)

    def post(self, request):
        user = request.user
        data = request.data
        quantity = data.get('quantity')
        coin_id = data.get('coin_id')

        try:
            user_profile = UserProfile.objects.get(user=user)
            coin = Coin.objects.get(pk=coin_id)

            # Try to get an existing CoinCollection record for the user and coin
            coin_collection, created = CoinCollection.objects.get_or_create(
                user_profile=user_profile,
                coin=coin,
            )

            if not created:
                # If the record already exists, update the fields.
                coin_collection.quantity += quantity
                coin_collection.denomination = data.get('denomination')
                coin_collection.variety = data.get('variety')
                coin_collection.comment = data.get('comment')
                coin_collection.mint_mark = data.get('mint_mark')
                coin_collection.mintage = data.get('mintage')
                coin_collection.pcgs_cert_num = data.get('pcgs_cert_num')
                coin_collection.point_value = data.get('point_value')
                coin_collection.year = data.get('year')
            else:
                # If the record is newly created, set the fields and quantity.
                coin_collection.denomination = data.get('denomination')
                coin_collection.variety = data.get('variety')
                coin_collection.comment = data.get('comment')
                coin_collection.mint_mark = data.get('mint_mark')
                coin_collection.mintage = data.get('mintage')
                coin_collection.pcgs_cert_num = data.get('pcgs_cert_num')
                coin_collection.point_value = data.get('point_value')
                coin_collection.year = data.get('year')
                coin_collection.quantity = quantity  # Set quantity to the provided quantity

            coin_collection.save()

            return Response({'Successfully Logged': quantity}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=400)



class RemoveFromCollection(APIView):
    def delete(self, request):
        user = request.user
        data = request.data
        coin_id = data.get('coin_id')
        quantity = data.get('quantity')
        try:
            # Get the user's CoinCollection entry for the specified coin
            coin_collection = CoinCollection.objects.get(user_profile__user=user, coin=coin_id)
            if coin_collection.quantity == quantity:
                # If quantity matches, delete the entire coin record
                coin_collection.delete()
            elif coin_collection.quantity > quantity:
                # If the quantity is greater, subtract the specified quantity
                coin_collection.quantity -= quantity
                coin_collection.save()
            else:
                # Handle the case where the quantity is less than what's requested
                return Response({'error': 'Requested quantity exceeds available quantity.'}, status=status.HTTP_400_BAD_REQUEST)

            return Response({'message': 'Coin(s) deleted or quantity subtracted successfully.'}, status=status.HTTP_200_OK)
        except CoinCollection.DoesNotExist:
            # Handle the case where the coin is not found in the user's collection
            return Response({'error': 'Coin not found in your collection.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
