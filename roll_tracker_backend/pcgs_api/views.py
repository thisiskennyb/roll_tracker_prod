from dotenv import load_dotenv 
import os
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import logging


load_dotenv()



class PCGSCoinAPIView(APIView):
    def get(self, request):
        pcgs_cert_num = request.GET.get("cert", '')
        print(pcgs_cert_num)
        try:
            url = f"https://api.pcgs.com/publicapi/coindetail/GetCoinFactsByCertNo/{pcgs_cert_num}"  # Replace with the correct URL
            headers = {
                'Authorization': f"bearer {os.environ['API_KEY']}",
            }

            response = requests.get(url, headers=headers)
            print(response, "this one")
            logging.info(f"Response Status Code: {response.status_code}")
            if response.status_code == 200:
                data = response.json()
                return Response(data, status=status.HTTP_200_OK)
            else:
                raise Exception("Failed to fetch coin")
        except Exception as e:
            return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
