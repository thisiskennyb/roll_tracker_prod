# Generated by Django 4.2.5 on 2023-10-10 16:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('coin', '0003_alter_coin_mint_mark'),
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='coin_collection',
            field=models.ManyToManyField(blank=True, related_name='user_profiles', to='coin.coin'),
        ),
    ]
