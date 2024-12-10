from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # Ensure password is handled securely
    profile_picture = serializers.ImageField(required=False)
    
    class Meta:
        model = User
        fields = ['username', 'password', 'first_name', 'last_name', 'bio', 'phoneNumber', 'tags', 'email', 'age', 'years_at_rit', 'profile_picture']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        tags = validated_data.pop('tags', [])
        user = User.objects.create(**validated_data)
        user.tags = tags  # Handle tags if provided
        if password:
            user.set_password(password)  # Use set_password to hash the password
        user.save()
        return user
