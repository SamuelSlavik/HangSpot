from rest_framework import serializers
from django.core.exceptions import FieldError

from .models import SpotCommon, SkateSpot, BMXSpot, WalkSpot, PicnicSpot, SunsetSpot, SpotType


class SpotSerializer(serializers.ModelSerializer):
    skate_spot_info = serializers.SerializerMethodField()
    bmx_spot_info = serializers.SerializerMethodField()
    walk_spot_info = serializers.SerializerMethodField()
    picnic_spot_info = serializers.SerializerMethodField()
    sunset_spot_info = serializers.SerializerMethodField()

    class Meta:
        model = SpotCommon
        fields = (
            'id',
            'name',
            'description',
            'latitude',
            'longitude',
            'park_near',
            'park_description',
            'created',
            'owner',
            'likes',
            'reports',
            'seen_by',
            'spot_type',
            'skate_spot_info',
            'bmx_spot_info',
            'walk_spot_info',
            'picnic_spot_info',
            'sunset_spot_info',
        )

    @staticmethod
    def get_skate_spot_info(obj):
        try:
            return SkateSpotSpecificsSerializer(SkateSpot.objects.get(spot_ptr_id=obj.id)).data
        except (FieldError, SkateSpot.DoesNotExist):
            return None

    @staticmethod
    def get_bmx_spot_info(obj):
        try:
            return BMXSpotSpecificsSerializer(BMXSpot.objects.get(spot_ptr_id=obj.id)).data
        except (FieldError, BMXSpot.DoesNotExist):
            return None

    @staticmethod
    def get_walk_spot_info(obj):
        try:
            return WalkSpotSpecificsSerializer(WalkSpot.objects.get(spot_ptr_id=obj.id)).data
        except (FieldError, WalkSpot.DoesNotExist):
            return None

    @staticmethod
    def get_picnic_spot_info(obj):
        try:
            return PicnicSpotSpecificsSerializer(PicnicSpot.objects.get(spot_ptr_id=obj.id)).data
        except (FieldError, PicnicSpot.DoesNotExist):
            return None

    @staticmethod
    def get_sunset_spot_info(obj):
        try:
            return SunsetSpotSpecificsSerializer(SunsetSpot.objects.get(spot_ptr_id=obj.id)).data
        except (FieldError, SunsetSpot.DoesNotExist):
            return None


class SkateSpotSpecificsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkateSpot
        fields = (
            'guarded',
            'guard_free_time',
            'open_alltime',
            'open_time',
            'close_time',
            'type',
        )


class BMXSpotSpecificsSerializer(serializers.ModelSerializer):
    class Meta:
        model = BMXSpot
        fields = (
            'guarded',
            'guard_free_time',
            'open_alltime',
            'open_time',
            'close_time',
            'type',
        )


class WalkSpotSpecificsSerializer(serializers.ModelSerializer):
    class Meta:
        model = WalkSpot
        fields = (
            'expected_duration',
            'path_description',
        )


class PicnicSpotSpecificsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PicnicSpot
        fields = (
            'seating_provided',
        )


class SunsetSpotSpecificsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SunsetSpot
        fields = (
            'seating',
        )


class SpotTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpotType
        fields = (
            'type_name',
            'display_name',
        )
