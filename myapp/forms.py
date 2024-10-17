from django import forms
from django.contrib.auth.forms import UserChangeForm
from .models import User

class UserProfileForm(UserChangeForm):
    password = None  # Password maydonini ko'rinmas qilish uchun

    class Meta:
        model = User
        fields = ('first_name', 'gender', 'accounts_type')
