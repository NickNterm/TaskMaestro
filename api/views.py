"""
API Views
"""
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema


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

