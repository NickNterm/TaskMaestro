"""
API Serializers
"""
from rest_framework import serializers
from .models import KindReminder, deadlines, DailyTasks, SpecialDays


class KindReminderSerializer(serializers.ModelSerializer):
    class Meta:
        model = KindReminder
        fields = ['id', 'name', 'status']
        read_only_fields = ['id']


class DeadlinesSerializer(serializers.ModelSerializer):
    class Meta:
        model = deadlines
        fields = ['id', 'start_date', 'end_date', 'remind_me_at', 'status']
        read_only_fields = ['id']


class DailyTasksSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyTasks
        fields = ['id', 'text', 'status']
        read_only_fields = ['id']


class SpecialDaysSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpecialDays
        fields = ['id', 'description', 'datetime']
        read_only_fields = ['id']
