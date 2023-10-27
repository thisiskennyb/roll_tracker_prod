from django.db import models
from accounts.models import UserProfile
from coin.models import Coin

class CoinCollection(models.Model):
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    coin = models.ForeignKey(Coin, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    denomination = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    mint_mark = models.CharField(null=True)
    variety = models.CharField(null=True)
    mintage = models.IntegerField(null=True)
    point_value = models.IntegerField(null=True)
    pcgs_cert_num = models.IntegerField(null=True)
    comment = models.CharField(null=True)
    year = models.IntegerField(null=True)

