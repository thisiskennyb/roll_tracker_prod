# Generated by Django 4.2.5 on 2023-10-02 21:36

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Coin',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('year', models.IntegerField()),
                ('denomination', models.DecimalField(decimal_places=2, max_digits=10)),
                ('variety', models.CharField(null=True)),
                ('mintage', models.IntegerField()),
                ('point_value', models.IntegerField()),
            ],
        ),
    ]
