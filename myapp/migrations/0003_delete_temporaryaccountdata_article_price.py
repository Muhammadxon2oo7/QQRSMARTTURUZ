# Generated by Django 5.1.1 on 2024-10-03 06:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0002_likedarticles'),
    ]

    operations = [
        migrations.DeleteModel(
            name='TemporaryAccountData',
        ),
        migrations.AddField(
            model_name='article',
            name='price',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=10),
        ),
    ]
