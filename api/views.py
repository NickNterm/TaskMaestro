"""
API Views
"""
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from drf_spectacular.utils import extend_schema
from rest_framework_simplejwt.tokens import RefreshToken
from .models import KindReminder, deadlines, DailyTasks, SpecialDays
from .serializers import (
    KindReminderSerializer,
    DeadlinesSerializer,
    DailyTasksSerializer,
    SpecialDaysSerializer,
    UserRegistrationSerializer
)


@extend_schema(
    summary="Health check endpoint",
    description="Returns API health status",
    tags=["Health"]
)
@api_view(['GET'])
@permission_classes([AllowAny])
def health_check(request):
    """
    Health check endpoint to verify API is running.
    """
    return Response({
        'status': 'healthy',
        'message': 'TaskMaestro API is running'
    }, status=status.HTTP_200_OK)


@extend_schema(
    summary="Register a new user",
    description="Create a new user account and get JWT tokens",
    tags=["Authentication"]
)
class UserRegistrationView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email
                },
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
