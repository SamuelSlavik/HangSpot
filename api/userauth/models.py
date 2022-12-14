from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class User(AbstractUser):
    id = models.BigAutoField(primary_key=True)
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(unique=True)
    date_joined = models.DateTimeField(auto_now=True)
    image = models.ImageField(upload_to='media/profile_images/')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = (
        'username',
    )

    def __str__(self):
        return self.username

    def __repr__(self):
        return self.username
