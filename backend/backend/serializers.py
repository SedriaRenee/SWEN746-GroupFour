from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['fullname', 'bio', 'profile_picture', 'username', 'email', 'phoneNumber', 'tags']
