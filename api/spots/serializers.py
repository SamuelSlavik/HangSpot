from rest_framework import serializers
from django.core.exceptions import FieldError

from .models import SpotCommon, SkateSpot, BMXSpot, WalkSpot, PicnicSpot, SunsetSpot, SpotType
from userauth.serializers import UserSerializer


class SkateSpotSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    owner = UserSerializer()
    likes = serializers.SerializerMethodField()
    reports = serializers.SerializerMethodField()
    seen_by = serializers.SerializerMethodField()

    class Meta:
        model = SkateSpot
        fields = '__all__'

    @staticmethod
    def get_likes(obj):
        return obj.likes.count()

    @staticmethod
    def get_reports(obj):
        return obj.reports.count()

    @staticmethod
    def get_seen_by(obj):
        return obj.reports.count()


class BMXSpotSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    owner = UserSerializer()
    likes = serializers.SerializerMethodField()
    reports = serializers.SerializerMethodField()
    seen_by = serializers.SerializerMethodField()

    class Meta:
        model = BMXSpot
        fields = '__all__'

    @staticmethod
    def get_likes(obj):
        return obj.likes.count()

    @staticmethod
    def get_reports(obj):
        return obj.reports.count()

    @staticmethod
    def get_seen_by(obj):
        return obj.reports.count()


class WalkSpotSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    owner = UserSerializer()
    likes = serializers.SerializerMethodField()
    reports = serializers.SerializerMethodField()
    seen_by = serializers.SerializerMethodField()

    class Meta:
        model = WalkSpot
        fields = '__all__'

    @staticmethod
    def get_likes(obj):
        return obj.likes.count()

    @staticmethod
    def get_reports(obj):
        return obj.reports.count()

    @staticmethod
    def get_seen_by(obj):
        return obj.reports.count()


class PicnicSpotSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    owner = UserSerializer()
    likes = serializers.SerializerMethodField()
    reports = serializers.SerializerMethodField()
    seen_by = serializers.SerializerMethodField()

    class Meta:
        model = PicnicSpot
        fields = '__all__'

    @staticmethod
    def get_likes(obj):
        return obj.likes.count()

    @staticmethod
    def get_reports(obj):
        return obj.reports.count()

    @staticmethod
    def get_seen_by(obj):
        return obj.reports.count()


class SunsetSpotSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    owner = UserSerializer()
    likes = serializers.SerializerMethodField()
    reports = serializers.SerializerMethodField()
    seen_by = serializers.SerializerMethodField()

    class Meta:
        model = SunsetSpot
        fields = '__all__'

    @staticmethod
    def get_likes(obj):
        return obj.likes.count()

    @staticmethod
    def get_reports(obj):
        return obj.reports.count()

    @staticmethod
    def get_seen_by(obj):
        return obj.reports.count()


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
    likes = serializers.SerializerMethodField()
    reports = serializers.SerializerMethodField()
    seen_by = serializers.SerializerMethodField()
    owner = UserSerializer()

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

    @staticmethod
    def get_likes(obj):
        return obj.likes.count()

    @staticmethod
    def get_reports(obj):
        return obj.reports.count()

    @staticmethod
    def get_seen_by(obj):
        return obj.reports.count()

    @staticmethod
    def get_type_specific_data(obj):
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
