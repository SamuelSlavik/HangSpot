import random

from rest_framework import serializers

from spots.models import (
    SpotCommon,
    SkateSpot,
    BMXSpot,
    WalkSpot,
    PicnicSpot,
    SunsetSpot,
    SkateSpotType,
    BMXSpotType,
    SpotType,
    SpotImage
)


class GeoGuesserSpotSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()

    class Meta:
        model = SpotCommon
        fields = (
            'id',
            'name',
            'description',
            'type',
            'image'
        )

    @staticmethod
    def get_type(obj):
        return obj.spot_type.display_name

    def get_image(self, obj):
        qs = SpotImage.objects.filter(spot__id=obj.id)
        chosen_image = f'api/image/spot/{qs[random.randint(0, len(qs)-1)].id}/'
        return self.context['request'].build_absolute_uri(chosen_image)


class GeoGuesserResultSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()
    result = serializers.SerializerMethodField()

    class Meta:
        model = SpotCommon
        fields = (
            'id',
            'name',
            'description',
            'type',
            'image',
            'result'
        )

    @staticmethod
    def get_type(obj):
        return obj.spot_type.display_name

    def get_image(self, obj):
        return self.context['image_url']

    def get_result(self, obj):
        return {'points': self.context['points'], 'distance': self.context['distance']}
