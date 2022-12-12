from rest_framework import serializers
from django.core.exceptions import FieldError

from .models import SpotCommon, SkateSpot, BMXSpot, WalkSpot, PicnicSpot, SunsetSpot, SpotType


class SkateSpotSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkateSpot
        fields = '__all__'


class BMXSpotSerializer(serializers.ModelSerializer):
    class Meta:
        model = BMXSpot
        fields = '__all__'


class WalkSpotSerializer(serializers.ModelSerializer):
    class Meta:
        model = WalkSpot
        fields = '__all__'


class PicnicSpotSerializer(serializers.ModelSerializer):
    class Meta:
        model = PicnicSpot
        fields = '__all__'


class SunsetSpotSerializer(serializers.ModelSerializer):
    class Meta:
        model = SunsetSpot
        fields = '__all__'


class SpotTypeSerializer(serializers.ModelSerializer):
    type_serializers = {
        'skateboard': SkateSpotSerializer,
        'bmx': BMXSpotSerializer,
        'walk': WalkSpotSerializer,
        'picnic': PicnicSpotSerializer,
        'sunset': SunsetSpotSerializer,
    }

    class Meta:
        model = SpotType
        fields = (
            'type_name',
            'display_name',
        )

    def get_spot_serializer_class(self):
        for key, cls in self.type_serializers.items():
            if key == self.data.get('type_name'):
                return cls
        return None


class SpotSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    spot_type = SpotTypeSerializer()
    type_specific_data = serializers.SerializerMethodField()

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
            'type_specific_data',
        )

    def get_type_specific_data(self, obj):
        try:
            data = obj.skatespot
            return SkateSpotSpecificsSerializer(data).data
        except SkateSpot.DoesNotExist:
            pass
        try:
            data = obj.bmxspot
            return BMXSpotSpecificsSerializer(data).data
        except BMXSpot.DoesNotExist:
            pass
        try:
            data = obj.walkspot
            return WalkSpotSpecificsSerializer(data).data
        except WalkSpot.DoesNotExist:
            pass
        try:
            data = obj.picnicspot
            return PicnicSpotSpecificsSerializer(data).data
        except PicnicSpot.DoesNotExist:
            pass
        try:
            data = obj.sunsetspot
            return SunsetSpotSpecificsSerializer(data).data
        except SunsetSpot.DoesNotExist:
            pass
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
            'specific_type',
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
            'specific_type',
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
