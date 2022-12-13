from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.exceptions import NotAuthenticated, NotFound

from .serializers import AchievementSerializer
from .achievements import Achievements


@api_view(['GET'])
def get_user_achievements_view(request, *args, **kwargs):
    data = request.data
    user_id = data.get('user_id')
    if user_id is None:
        if not request.user.is_authenticated:
            raise NotAuthenticated()
        user_id = request.user.id
    achievements = Achievements()
    achieved = achievements.get_achievements(user_id)
    achievements_serializer = AchievementSerializer(achieved, many=True)
    achievements.reset()

    return Response(achievements_serializer.data)
