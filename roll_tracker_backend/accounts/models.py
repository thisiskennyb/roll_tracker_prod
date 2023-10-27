from django.db import models
from django.contrib.auth.models import User
from coin.models import Coin

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    user_score = models.IntegerField(default=0)
    dollar_value_searched = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    # coin_collection = models.ManyToManyField(Coin, related_name='user_profiles', blank=True)

    # def add_to_collection(self, coin_data):
  
    #     existing_coin = self.coin_collection.filter(pk=coin_data['id'])
        
    #     if existing_coin:
    #         print("existing coin")
    #         # Coin already exists, so increment the quantity
    #         quantity = coin_data.get('quantity', 1)
    #         existing_coin.quantity += quantity
    #         existing_coin.save()
    #         self.user_score += existing_coin.point_value * quantity
    #         self.save()
    #         return {'message': 'Quantity increased for the coin.'}
    #     else:
    #         # Coin doesn't exist in the collection, add it
    #         coin = Coin.objects.create(
    #             # pk=coin_data['id'],
    #             year=coin_data['year'],
    #             denomination=coin_data['denomination'],
    #             mint_mark=coin_data['mint_mark'],
    #             variety=coin_data['variety'],
    #             mintage=coin_data['mintage'],
    #             point_value=coin_data['point_value'],
    #             pcgs_cert_num=coin_data['pcgs_cert_num'],
    #             comment=coin_data['comment'],
    #             quantity=coin_data.get('quantity', 1)
    #         )
    #         self.coin_collection.add(coin)
    #         self.user_score += coin.point_value * coin.quantity
    #         self.save()
    #         return {'message': 'Coin added to collection.'}


    def add_to_dollar_value_searched(self, coin_hunt_value, points_earned):
        self.dollar_value_searched += coin_hunt_value
        self.user_score += points_earned
        self.save()


    def __str__(self):
        return self.user.username
