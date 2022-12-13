from rest_framework import serializers
from django.core.exceptions import FieldError

from .models import SpotCommon, SkateSpot, BMXSpot, WalkSpot, PicnicSpot, SunsetSpot, SpotType, SpotImage
from userauth.serializers import UserSerializer


class SpotSerializerAbstract(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    likes = serializers.SerializerMethodField()
    reports = serializers.SerializerMethodField()
    seen_by = serializers.SerializerMethodField()

    class Meta:
        model = None
        fields = '__all__'
        extra_kwargs = {
            'owner': {
                'read_only': True,
                'required': False,
            },
        }

    @staticmethod
    def get_likes(obj):
        return obj.likes.count()

    @staticmethod
    def get_reports(obj):
        return obj.reports.count()

    @staticmethod
    def get_seen_by(obj):
        return obj.reports.count()


class SpotTypeSerializerBase(serializers.ModelSerializer):
    class Meta:
        model = SpotType
        fields = '__all__'


class SkateSpotDisplaySerializer(SpotSerializerAbstract):
    owner = UserSerializer()
    spot_type = SpotTypeSerializerBase()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.Meta.model = SkateSpot


class BMXSpotDisplaySerializer(SpotSerializerAbstract):
    owner = UserSerializer()
    spot_type = SpotTypeSerializerBase()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.Meta.model = BMXSpot


class WalkSpotDisplaySerializer(SpotSerializerAbstract):
    owner = UserSerializer()
    spot_type = SpotTypeSerializerBase()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.Meta.model = WalkSpot


class PicnicSpotDisplaySerializer(SpotSerializerAbstract):
    owner = UserSerializer()
    spot_type = SpotTypeSerializerBase()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.Meta.model = PicnicSpot


class SunsetSpotDisplaySerializer(SpotSerializerAbstract):
    owner = UserSerializer()
    spot_type = SpotTypeSerializerBase()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.Meta.model = SunsetSpot


class SkateSpotManageSerializer(SpotSerializerAbstract):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.Meta.model = SkateSpot
        self.owner = serializers.PrimaryKeyRelatedField(read_only=True)


class BMXSpotManageSerializer(SpotSerializerAbstract):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.Meta.model = BMXSpot
        self.owner = serializers.PrimaryKeyRelatedField(read_only=True)


class WalkSpotManageSerializer(SpotSerializerAbstract):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.Meta.model = WalkSpot
        self.owner = serializers.PrimaryKeyRelatedField(read_only=True)


class PicnicSpotManageSerializer(SpotSerializerAbstract):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.Meta.model = PicnicSpot
        self.owner = serializers.PrimaryKeyRelatedField(read_only=True)


class SunsetSpotManageSerializer(SpotSerializerAbstract):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.Meta.model = SunsetSpot
        self.owner = serializers.PrimaryKeyRelatedField(read_only=True)


class SpotTypeSerializer(serializers.ModelSerializer):
    type_serializers = {
        'display': {
            'skateboard': SkateSpotDisplaySerializer,
            'bmx': BMXSpotDisplaySerializer,
            'walk': WalkSpotDisplaySerializer,
            'picnic': PicnicSpotDisplaySerializer,
            'sunset': SunsetSpotDisplaySerializer,
        },
        'manage': {
            'skateboard': SkateSpotManageSerializer,
            'bmx': BMXSpotManageSerializer,
            'walk': WalkSpotManageSerializer,
            'picnic': PicnicSpotManageSerializer,
            'sunset': SunsetSpotManageSerializer,
        },
    }

    class Meta:
        model = SpotType
        fields = (
            'type_name',
            'display_name',
            'marker_color',
        )

    def get_spot_serializer_class(self, option='display'):
        try:
            for key, cls in self.type_serializers[option].items():
                if key == self.data.get('type_name'):
                    return cls
            return None
        except KeyError:
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


class SpotCommonSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    owner = serializers.PrimaryKeyRelatedField(read_only=True)
    spot_type = serializers.PrimaryKeyRelatedField(read_only=True)
    likes = serializers.PrimaryKeyRelatedField(read_only=True)
    reports = serializers.PrimaryKeyRelatedField(read_only=True)
    seen_by = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = SpotCommon
        fields = '__all__'


class SkateSpotSpecificsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkateSpot
        fields = (
            'guarded',
            'guard_free_from',
            'guard_free_till',
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
            'guard_free_from',
            'guard_free_till',
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
            'seating_provided',
        )


class SpotImageManageSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpotImage
        fields = '__all__'


class SpotImageDisplaySerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = SpotImage
        fields = (
            'id',
            'spot',
            'image_url',
        )

    @staticmethod
    def get_image_url(obj):
        return obj.image.path
