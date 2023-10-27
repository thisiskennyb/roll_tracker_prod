from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Coin  
from .serializers import *  
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.core import serializers
from accounts.models import UserProfile

class CoinAPIView(APIView):
    def get(self, request, pk=None):
        year_param = request.GET.get("year", '')
        mint_mark_param = request.GET.get("mintmark", '')
        comment_param = request.GET.get("comment", '')
        

        if mint_mark_param != '' and year_param != '' and comment_param != '':
            unique_mint_marks = Coin.objects.filter(year=year_param, mint_mark=mint_mark_param)
            unique_comments_dict = {}
            for coin in unique_mint_marks:
                unique_comments_dict[coin.pk] = coin.comment   
            return JsonResponse(unique_comments_dict, status=200)


# if the a year parameter gets passed in return all coins for given year
        elif year_param != '' and mint_mark_param == '':
            # coins = Coin.objects.all()
            year_issues = Coin.objects.filter(year=year_param)
            serializer = CoinSerializer(year_issues, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
# if a year and mm parameter get passed in return all coins that share the same mint mark for the given year  
        elif mint_mark_param != '' and year_param != '':
            unique_mint_marks = Coin.objects.filter(year=year_param, mint_mark=mint_mark_param)
            serializer = CoinSerializer(unique_mint_marks, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        elif pk:
            coin = get_object_or_404(Coin, pk=pk)
            serializer = CoinSerializer(coin)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            coins = Coin.objects.all()
            serializer = CoinSerializer(coins, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)


class YearAPIView(APIView):
    def get(self, request):
        # Generate a list of years from 1856 to the present (current year)
        current_year = 2023
        years_list = list(range(1856, current_year + 1))

        # Exclude the years 1959 to 1967
        excluded_years = set(range(1959, 1968))
        filtered_years = [year for year in years_list if year not in excluded_years]

        # Serialize the list of years
        serializer = YearSerializer({'years': filtered_years})
        return Response(serializer.data, status=status.HTTP_200_OK)

