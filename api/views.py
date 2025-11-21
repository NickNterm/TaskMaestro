"""
API Views
"""
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from drf_spectacular.utils import extend_schema
from .models import KindReminder, deadlines, DailyTasks, SpecialDays
from .serializers import (
    KindReminderSerializer,
    DeadlinesSerializer,
    DailyTasksSerializer,
    SpecialDaysSerializer
)


@extend_schema(
    summary="Health check endpoint",
    description="Returns API health status",
    tags=["Health"]
)
@api_view(['GET'])
def health_check(request):
    """
    Health check endpoint to verify API is running.
    """
    return Response({
        'status': 'healthy',
        'message': 'TaskMaestro API is running'
    }, status=status.HTTP_200_OK)


# KindReminder Views
class KindReminderListCreateView(ListCreateAPIView):
    queryset = KindReminder.objects.all()
    serializer_class = KindReminderSerializer


class KindReminderDetailView(RetrieveUpdateDestroyAPIView):
    queryset = KindReminder.objects.all()
    serializer_class = KindReminderSerializer


# Deadlines Views
class DeadlinesListCreateView(ListCreateAPIView):
    queryset = deadlines.objects.all()
    serializer_class = DeadlinesSerializer


class DeadlinesDetailView(RetrieveUpdateDestroyAPIView):
    queryset = deadlines.objects.all()
    serializer_class = DeadlinesSerializer


# DailyTasks Views
class DailyTasksListCreateView(ListCreateAPIView):
    queryset = DailyTasks.objects.all()
    serializer_class = DailyTasksSerializer


class DailyTasksDetailView(RetrieveUpdateDestroyAPIView):
    queryset = DailyTasks.objects.all()
    serializer_class = DailyTasksSerializer


# SpecialDays Views
class SpecialDaysListCreateView(ListCreateAPIView):
    queryset = SpecialDays.objects.all()
    serializer_class = SpecialDaysSerializer


class SpecialDaysDetailView(RetrieveUpdateDestroyAPIView):
    queryset = SpecialDays.objects.all()
    serializer_class = SpecialDaysSerializer
