"""
API Serializers
"""
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import KindReminder, deadlines, DailyTasks, SpecialDays


class KindReminderSerializer(serializers.ModelSerializer):
    class Meta:
        model = KindReminder
        fields = ['id', 'name', 'status']
        read_only_fields = ['id']


class DeadlinesSerializer(serializers.ModelSerializer):
    class Meta:
        model = deadlines
        fields = ['id', 'name', 'start_date', 'end_date', 'remind_me_at', 'status']
        read_only_fields = ['id']


class DailyTasksSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyTasks
        fields = ['id', 'text', 'status']
        read_only_fields = ['id']


class SpecialDaysSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpecialDays
        fields = ['id', 'description', 'is_duration', 'datetime', 'start_date', 'end_date']
        read_only_fields = ['id']


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    password_confirm = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password_confirm']
        extra_kwargs = {
            'email': {'required': False}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError("Passwords don't match")
        return attrs

    def create(self, validated_data):
        validated_data.pop('password_confirm')
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user
