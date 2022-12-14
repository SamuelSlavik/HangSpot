from django.shortcuts import render
from django.http import HttpResponse

from rest_framework.exceptions import NotFound
from rest_framework.decorators import api_view

from spots.models import SpotImage
from userauth.models import User


@api_view(['GET'])
def get_image_data_view(request, *args, **kwargs):
    image_id = kwargs.pop('pk')
    try:
        image = SpotImage.objects.get(pk=image_id).image
    except SpotImage.DoesNotExist:
        raise NotFound(detail='image not found')

    ext = image.name.split('.')[-1]
    print(image)

    return HttpResponse(image, content_type=f'image/png')


@api_view(['GET'])
def get_user_image_data_view(request, *args, **kwargs):
    user_id = kwargs.pop('pk')
    try:
        user_image = User.objects.get(pk=user_id).image
    except User.DoesNotExist:
        raise NotFound()

    return HttpResponse(user_image, content_type=f'image/png')
