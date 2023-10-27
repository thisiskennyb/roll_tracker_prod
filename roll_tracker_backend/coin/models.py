from django.db import models

class Coin(models.Model):
    year = models.IntegerField()
    denomination = models.DecimalField(max_digits=10, decimal_places=2)
    mint_mark = models.CharField(null=True)
    variety = models.CharField(null=True)
    mintage = models.IntegerField(null=True)
    point_value = models.IntegerField(null=True)
    pcgs_cert_num = models.IntegerField(null=True)
    comment = models.CharField(null=True)

class CoinPoints(models.Model):
    type = models.CharField()
    point_value = models.CharField()
    category = models.BooleanField()

