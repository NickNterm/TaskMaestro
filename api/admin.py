"""
API Admin Configuration
"""
from django.contrib import admin
from .models import KindReminder, deadlines, DailyTasks, SpecialDays


@admin.register(KindReminder)
class KindReminderAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'status']
    list_filter = ['status']
    search_fields = ['name']


@admin.register(deadlines)
class DeadlinesAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'start_date', 'end_date', 'remind_me_at', 'status']
    list_filter = ['status', 'start_date', 'end_date']
    search_fields = ['name']
    date_hierarchy = 'start_date'


@admin.register(DailyTasks)
class DailyTasksAdmin(admin.ModelAdmin):
    list_display = ['id', 'text', 'status']
    list_filter = ['status']
    search_fields = ['text']


@admin.register(SpecialDays)
class SpecialDaysAdmin(admin.ModelAdmin):
    list_display = ['id', 'description', 'is_duration', 'datetime', 'start_date', 'end_date']
    list_filter = ['is_duration', 'datetime', 'start_date']
    search_fields = ['description']
    date_hierarchy = 'datetime'
