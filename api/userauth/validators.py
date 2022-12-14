from rest_framework import serializers


class ImageExtensionValidator:
    def __init__(self):
        self.allowed_extensions = ['png', 'jpg', 'jpeg', 'webp']

    def __call__(self, filename):
        ext = filename.split('.')[-1]
        if ext not in self.allowed_extensions:
            message = f'Extension {ext} is not allowed for images.'
            raise serializers.ValidationError(message)
