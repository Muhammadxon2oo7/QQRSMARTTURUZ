from django.db import models

# Create your models here.

from django.contrib.auth.models import AbstractUser, PermissionsMixin, Permission, Group
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.hashers import make_password

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name
    

class Article(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='articles')
    title = models.CharField(max_length=200)
    text = models.TextField()
    img = models.ImageField(upload_to='images/')

    def __str__(self):
        return self.title

class Reclama(models.Model):
    title = models.CharField(max_length=100)
    img = models.ImageField(upload_to='reklama/')

    def __str__(self):
        return self.title

from django.db.models import Avg
class TourismPlace(models.Model):
    title = models.CharField(max_length=200)
    text = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    duration = models.CharField(max_length=80, null=True)  
    places_count = models.CharField(max_length=80, null=True)
    views = models.PositiveIntegerField(default=0)  
    phone_number = models.CharField(max_length=20, blank=True, null=True) 

    def upload_to(instance, filename):
        return 'tourism_images/{filename}'.format(filename=filename)
    
    img = models.ImageField(upload_to=upload_to)

    def average_rating(self):
        return self.ratings.aggregate(Avg('stars'))['stars__avg'] or 0
    
    def rating_count(self):
        return self.ratings.count()

    def __str__(self):
        return self.title

class TourismPlaceImage(models.Model):
    place = models.ForeignKey(TourismPlace, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='tourism_images/')

    def __str__(self):
        return f"Image for {self.place.title}"



class CustomUserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """
        Create and save a user with the given username, email, and password.
        """
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.password = make_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user( email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_user( email, password, **extra_fields)


class User(AbstractUser, PermissionsMixin):
    username = None
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    accounts_type = models.CharField(max_length=15)
    email = models.EmailField(unique=True)
    gender = models.CharField(max_length=10)
    

    objects = CustomUserManager()

    def __str__(self):
        return self.email

from django.utils import timezone

class TemporaryAccountData(models.Model):
    first_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    accounts_type = models.CharField(max_length=15)
    gender = models.CharField(max_length=10)
    verification_code = models.CharField(max_length=6)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    

    def __str__(self):
        return self.email
    
from django.conf import settings 


from django.core.validators import MinValueValidator, MaxValueValidator
class Rating(models.Model):
    place = models.ForeignKey(TourismPlace, related_name="ratings", on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    stars = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = [['user', 'place']]

    def __str__(self):
        return f"{self.stars} stars by {self.user.email} for {self.place.title}"

class Comment(models.Model):
    place = models.ForeignKey(TourismPlace, related_name="comments", on_delete=models.CASCADE) 
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  
    text = models.TextField()  
    created_at = models.DateTimeField(default=timezone.now) 
    parent = models.ForeignKey('self', on_delete=models.CASCADE, related_name='replies', null=True, blank=True)
    def __str__(self):
        return f"Comment by {self.user.first_name} on {self.place.title}"




