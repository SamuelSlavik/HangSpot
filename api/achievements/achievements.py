from django.db.models import Count

from rest_framework.exceptions import NotAuthenticated, NotFound

from userauth.models import User
from spots.models import SpotCommon


def get_achievements(user_id):
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        raise NotFound(detail='User not found')
    achievements = list()
    achievements += _get_likes_achievements(user)
    achievements += _get_displays_achievements(user)
    achievements += _get_created_achievements(user)
    achieved = _parse_achievements(achievements)
    return achieved


def _parse_achievements(achievements):
    achieved = list()
    for achievement in achievements:
        skip = False
        for idx, value in enumerate(achievement['tiers']):
            if value > achievement['comparator']:
                achieved.append({
                    'current_tier': idx,
                    'total_tiers': len(achievement['tiers']),
                    'goal': {
                        'progress': achievement['comparator'],
                        'quantity': value,
                        'description': achievement['description'],
                    },
                })
                skip = True
                break
        if not skip:
            achieved.append({
                'current_tier': len(achievement['tiers']),
                'total_tiers': len(achievement['tiers']),
                'goal': {
                    'progress': achievement['comparator'],
                    'quantity': achievement['tiers'][-1],
                    'description': achievement['description'],
                },
            })
    return achieved


def _get_likes_achievements(user):
    achievements = [
        {
            'description': 'Total likes given',
            'comparator': user.likes.count(),
            'tiers': [10, 20, 50, 100, 150]
        },
        {
            'description': 'One spot likes earned',
            'comparator': _get_user_most_liked_spot(user).like_count,
            'tiers': [5, 10, 20]
        },
    ]
    return achievements


def _get_user_most_liked_spot(user):
    spots_qs = SpotCommon.objects.annotate(like_count=Count('likes')).filter(owner=user).order_by('-like_count')
    return spots_qs[0]


def _get_displays_achievements(user):
    achievements = [
        {
            'description': 'Total spots viewed',
            'comparator': user.displays.count(),
            'tiers': [25, 50, 100]
        },
        {
            'description': 'One spot earned views',
            'comparator': _get_user_most_displayed_spot(user).display_count,
            'tiers': [10, 25, 50, 100]
        },
    ]
    return achievements


def _get_user_most_displayed_spot(user):
    spots_qs = SpotCommon.objects.annotate(display_count=Count('displays')).filter(owner=user).order_by('-display_count')
    return spots_qs[0]


def _get_created_achievements(user):
    achievements = [
        {
            'description': 'Total spots created',
            'comparator': _get_user_spots(user).count(),
            'tiers': [5, 10, 20]
        },
    ]
    return achievements


def _get_user_spots(user):
    spots_qs = SpotCommon.objects.filter(owner=user)
    return spots_qs

