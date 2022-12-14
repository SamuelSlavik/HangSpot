from django.db import models

from userauth.models import User


# Create your models here.
class SpotType(models.Model):
    type_name = models.CharField(max_length=255, unique=True, primary_key=True)
    display_name = models.CharField(max_length=255)
    marker_color = models.CharField(max_length=255)

    def __str__(self):
        return self.display_name

    def __repr__(self):
        return self.type_name


class SpotCommon(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True, default=None)
    latitude = models.FloatField()
    longitude = models.FloatField()
    park_near = models.BooleanField(default=None, null=True)
    park_description = models.TextField(blank=True, null=True, default=None)
    created = models.DateTimeField(auto_now=True)
    likes = models.ManyToManyField(to=User, related_name='likes', blank=True)
    reports = models.ManyToManyField(to=User, related_name='reports', blank=True)
    owner = models.ForeignKey(to=User, on_delete=models.CASCADE)
    displays = models.ManyToManyField(to=User, related_name='displays', blank=True)
    spot_type = models.ForeignKey(to=SpotType, on_delete=models.CASCADE, to_field='type_name')

    def __str__(self):
        return self.name

    def __repr__(self):
        return self.name


class SpotImage(models.Model):
    spot = models.ForeignKey(to=SpotCommon, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='media/spot_images/')


class SkateSpotType(models.Model):
    type_name = models.CharField(max_length=255, primary_key=True, unique=True)


class SkateSpot(SpotCommon):
    specific_type = models.ManyToManyField(to=SkateSpotType, related_name='skate_spots', blank=True)
    guarded = models.BooleanField(default=False)
    guard_free_from = models.TimeField(blank=True, null=True, default=None)
    guard_free_till = models.TimeField(blank=True, null=True, default=None)
    open_alltime = models.BooleanField(default=True)
    open_time = models.TimeField(blank=True, null=True, default=None)
    close_time = models.TimeField(blank=True, null=True, default=None)


class BMXSpotType(models.Model):
    type_name = models.CharField(max_length=255, primary_key=True, unique=True)


class BMXSpot(SpotCommon):
    specific_type = models.ManyToManyField(to=BMXSpotType, related_name='bmx_spots', blank=True)
    guarded = models.BooleanField(default=False)
    guard_free_from = models.TimeField(blank=True, null=True, default=None)
    guard_free_till = models.TimeField(blank=True, null=True, default=None)
    open_alltime = models.BooleanField(default=True)
    open_time = models.TimeField(blank=True, null=True, default=None)
    close_time = models.TimeField(blank=True, null=True, default=None)


class WalkSpot(SpotCommon):
    expected_duration = models.FloatField(blank=True, null=True, default=None)
    path_description = models.TextField(blank=True, null=True, default=None)


class PicnicSpot(SpotCommon):
    seating_provided = models.BooleanField(default=False)


class SunsetSpot(SpotCommon):
    seating_provided = models.BooleanField(default=False)


