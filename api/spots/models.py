from django.db import models

from userauth.models import User


# Create your models here.
class Spot(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True, default=None)
    latitude = models.FloatField()
    longitude = models.FloatField()
    park_near = models.BooleanField(default=None, null=True)
    park_description = models.TextField(blank=True, null=True, default=None)
    created = models.DateTimeField(auto_now=True)
    likes = models.ManyToManyField(to=User, related_name='likes')
    reports = models.ManyToManyField(to=User, related_name='reports')
    owner = models.ForeignKey(to=User, on_delete=models.CASCADE)
    seen_by = models.ManyToManyField(to=User, related_name='seen_spots')

    def __str__(self):
        return self.name

    def __repr__(self):
        return self.name


class SpotImage(models.Model):
    spot = models.ForeignKey(to=Spot, on_delete=models.CASCADE)
    image = models.ImageField()


class SkateSpotType(models.Model):
    type_name = models.CharField(max_length=255, primary_key=True, unique=True)


class SkateSpot(Spot):
    type = models.ManyToManyField(to=SkateSpotType, related_name='skate_spots')
    guarded = models.BooleanField(default=False)
    guard_free_time = models.TimeField(null=True, default=None)
    open_alltime = models.BooleanField(default=True)
    open_time = models.TimeField(null=True, default=None)
    close_time = models.TimeField(null=True, default=None)


class BMXSpotType(models.Model):
    type_name = models.CharField(max_length=255, primary_key=True, unique=True)


class BMXSpot(Spot):
    type = models.ManyToManyField(to=BMXSpotType, related_name='bmx_spots')
    guarded = models.BooleanField(default=False)
    guard_free_time = models.TimeField(null=True, default=None)
    open_alltime = models.BooleanField(default=True)
    open_time = models.TimeField(null=True, default=None)
    close_time = models.TimeField(null=True, default=None)


class WalkSpot(Spot):
    expected_duration = models.FloatField(null=True, default=None)
    path_description = models.TextField(blank=True, null=True, default=None)


class PicnicSpot(Spot):
    seating_provided = models.BooleanField(default=False)


class SunsetSpot(Spot):
    seating = models.BooleanField(default=False)

