from rest_framework.exceptions import NotAuthenticated, NotFound

from userauth.models import User


class Achievements:

    def get_achievements(self, user_id):
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            raise NotFound(detail='User not found')

        self.Likes(user.likes.count())
        achievements = self.Displays(user.displays.count()).current_tiers
        return achievements

    def reset(self):
        self.Achievement.achievements = list()
        self.Achievement.current_tiers = list()

    class Achievement:
        achievements = list()
        comparator = None
        current_tiers = list()

        def __init__(self, comparator):
            self.comparator = comparator
            self.get_tiers()

        def get_tiers(self):
            for achievement in self.achievements:
                skip = False
                for idx, value in enumerate(achievement['tiers']):
                    if value > self.comparator:
                        self.current_tiers.append({
                            'current_tier': idx,
                            'total_tiers': len(achievement['tiers']),
                            'goal': {
                                'progress': self.comparator,
                                'quantity': value,
                                'description': achievement['description'],
                            },
                        })
                        skip = True
                        break
                if not skip:
                    self.current_tiers.append({
                        'current_tier': len(achievement['tiers']),
                        'total_tiers': len(achievement['tiers']),
                        'goal': {
                            'progress': self.comparator,
                            'quantity': achievement['tiers'][-1],
                            'description': achievement['description'],
                        },
                    })

    class Likes(Achievement):
        achievements = [
            {
                'description': 'Total likes earned',
                'tiers': [10, 20, 50, 100, 150]
            },
            {
                'description': 'One spot likes earned',
                'tiers': [5, 10, 20]
            },
        ]

    class Displays(Achievement):
        achievements = [
            {
                'description': 'Total displays earned',
                'tiers': [25, 50, 100]
            },
            {
                'description': 'One spot displays earned',
                'tiers': [10, 25, 50, 100]
            },
        ]

