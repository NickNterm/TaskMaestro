"""
API URL Configuration
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    path('health/', views.health_check, name='health-check'),
    
    # KindReminder endpoints
    path('kind-reminders/', views.KindReminderListCreateView.as_view(), name='kind-reminder-list-create'),
    path('kind-reminders/<int:pk>/', views.KindReminderDetailView.as_view(), name='kind-reminder-detail'),
    
    # Deadlines endpoints
    path('deadlines/', views.DeadlinesListCreateView.as_view(), name='deadlines-list-create'),
    path('deadlines/<int:pk>/', views.DeadlinesDetailView.as_view(), name='deadlines-detail'),
    
    # DailyTasks endpoints
    path('daily-tasks/', views.DailyTasksListCreateView.as_view(), name='daily-tasks-list-create'),
    path('daily-tasks/<int:pk>/', views.DailyTasksDetailView.as_view(), name='daily-tasks-detail'),
    
    # SpecialDays endpoints
    path('special-days/', views.SpecialDaysListCreateView.as_view(), name='special-days-list-create'),
    path('special-days/<int:pk>/', views.SpecialDaysDetailView.as_view(), name='special-days-detail'),
]
