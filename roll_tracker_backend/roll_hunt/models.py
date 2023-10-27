from django.db import models
from accounts.models import UserProfile

class RollHunt(models.Model):
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    total_point_value = models.IntegerField()
    hunt_dollar_value = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Roll Hunt - {self.date}'