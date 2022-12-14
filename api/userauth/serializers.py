from rest_framework import serializers
from rest_framework_simplejwt.serializers import (
    TokenObtainPairSerializer,
)

from .models import User
from .validators import ImageExtensionValidator


class UserObtainTokenPairSerializer(TokenObtainPairSerializer):
    def create(self, validated_data):
        return super().create(validated_data)

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)

    def validate(self, attrs):
        data = super().validate(attrs)
        data['user_id'] = self.user.id
        return data
    
    @classmethod
    def get_token(cls, user):
        return super().get_token(user)


class UserSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True},
            'image': {'validators': (ImageExtensionValidator, )}
        }

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    def get_image(self, obj):
        image_url = f'/api/image/user/{obj.id}/'
        return self.context['request'].build_absolute_uri(image_url)
