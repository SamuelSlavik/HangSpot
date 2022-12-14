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


class SpotFinderSpotSerializer(serializers.ModelSerializer):
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
        chosen_image = f'/api/image/spot/{qs[random.randint(0, len(qs) - 1)].id}/'
        return self.context['request'].build_absolute_uri(chosen_image)


class CoordinatesSerializer(serializers.Serializer):
    latitude = serializers.FloatField()
    longitude = serializers.FloatField()

    class Meta:
        fields = (
            'latitude',
            'longitude',
        )

    def create(self, validated_data):
        return super().create(validated_data)

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)


class SpotFinderResultSerializer(serializers.Serializer):
    points = serializers.IntegerField()
    distance = serializers.FloatField()
    real_coordinates = CoordinatesSerializer()
    guess_coordinates = CoordinatesSerializer()

    class Meta:
        fields = (
            'points',
            'distance',
            'real_coordinates',
            'guess_coordinates'
        )

    def create(self, validated_data):
        return super().create(validated_data)

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)
