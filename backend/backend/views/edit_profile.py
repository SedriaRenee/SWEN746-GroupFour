from rest_framework.permissions import AllowAny  # This allows any user to access the view
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from ..serializers import UserSerializer

@api_view(['GET', 'PUT'])
@permission_classes([AllowAny])  # Allow any user to edit their profile for now
def edit_profile(request):
    user = request.user
    print(request.user)
    print(request.data)

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)

    elif request.method == 'PUT':
        # Handle form data, including file uploads
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'username': user.username}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


