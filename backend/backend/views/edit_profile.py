from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from ..models import User
from ..serializers import UserSerializer

@api_view(['GET', 'PUT'])
def edit_profile(request):
    user = request.user  

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

