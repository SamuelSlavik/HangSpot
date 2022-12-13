from rest_framework import serializers


class GoalSerializer(serializers.Serializer):
    progress = serializers.IntegerField()
    quantity = serializers.IntegerField()
    description = serializers.CharField(max_length=255)

    def create(self, validated_data):
        return super().create(validated_data)

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)


class AchievementSerializer(serializers.Serializer):
    current_tier = serializers.IntegerField()
    total_tiers = serializers.IntegerField()
    goal = GoalSerializer()

    def create(self, validated_data):
        return super().create(validated_data)

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)


