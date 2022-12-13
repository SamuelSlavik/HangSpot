from django.test import TestCase
import requests
from .models import SpotImage


class SpotImagesTestCase(TestCase):
    def test_SpotImage_creation(self):
        file_1 = open('./test_files/male-placeholder-image.jpeg')
        file_2 = open('./test_files/placeholder-1.jpeg')
        file_3 = open('./test_files/placeholder-3.jpeg')
        files = [
            file_1,
            file_2,
            file_3
        ]
        headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcxMjg2MTg0LCJpYXQiOjE2NzA4NTQxODQsImp0aSI6IjZkMjcyMTM1YjQwMDRkZWI4MzBjNjRmMjdkMjA1NjUyIiwidXNlcl9pZCI6MX0.FoOcGnes3mmwPjsC8ovdQxBOYb3GveYpGZepW0MPWDM'
        }
        data = {
            'name': 'Walk spot over here',
            'latitude': 15.2,
            'longitude': 17.2,
            'spot_type': 'walk'
        }

        response = requests.post('http://localhost:8000/api/spots/create/', data=data, headers=headers, files=files)
        self.assertTrue(response.status_code == 201)
