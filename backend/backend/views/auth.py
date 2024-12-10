import json
import logging
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.forms import PasswordChangeForm
from ..models import User
from backend.forms import UsernameChangeForm
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from ..serializers import UserSerializer
from rest_framework.response import Response

@api_view(['POST'])
def signup(request):
    if request.method == 'POST':
        try:
            # Print the incoming request data for debugging
            print(f"Received data: {request.data}")
            
            data = request.data
            username = data.get('username')
            password = data.get('password')
            first_name = data.get('first_name')
            last_name = data.get('last_name')
            email = data.get('email')
            phoneNumber = data.get('phoneNumber', '')

            if User.objects.filter(username=username).exists():
                return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

            if User.objects.filter(email=email).exists():
                return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)

            user_data = {
                'username': username,
                'password': password,
                'first_name': first_name,
                'last_name': last_name,
                'phoneNumber': phoneNumber,
                'email': email
            }

            # Create user with serializer
            serializer = UserSerializer(data=user_data)

            if serializer.is_valid():
                user = serializer.save()

                # Generate JWT tokens
                refresh = RefreshToken.for_user(user)
                access_token = str(refresh.access_token)
                refresh_token = str(refresh)

                login(request, user)

                return Response({
                    'message': 'User created successfully.',
                    'access_token': access_token,
                    'refresh_token': refresh_token,
                    'redirect': f'/profile/{user.username}/'
                }, status=status.HTTP_201_CREATED)

            return Response({'error': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            logging.error(f"Signup error: {e}")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# API Login View
@api_view(['POST'])
def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(data=request.data)
        if form.is_valid():
            user = form.get_user()
            login(request, user)  

            return JsonResponse({'message': 'Login successful', 'user': user.username}, status=200)
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

# Logout View
@login_required
def logout_view(request):
    logout(request)
    return redirect('login')

# Password Change View
@login_required
def password_change(request):
    if request.method == 'POST':
        form = PasswordChangeForm(user=request.user, data=request.POST)
        if form.is_valid():
            user = form.save()
            update_session_auth_hash(request, user)  # Keep the user logged in after password change
            messages.success(request, 'Your password was successfully updated!')
            return redirect('feed')
        else:
            messages.error(request, 'Please correct the error below.')
    else:
        form = PasswordChangeForm(user=request.user)
    return render(request, 'password_change.html', {'form': form})


# View for changing a user's username
@login_required
def change_username(request):
    if request.method == 'POST':
        form = UsernameChangeForm(request.POST, instance=request.user)
        if form.is_valid():
            user = form.save()
            update_session_auth_hash(request, user)  # Update session to keep user logged in
            messages.success(request, 'Your username has been updated.')
            return redirect('user_profile', user.username)
    else:
        form = UsernameChangeForm(instance=request.user)
    return render(request, 'change_username.html', {'form': form})


# Password Change View
@login_required
def password_change(request):
    if request.method == 'POST':
        form = PasswordChangeForm(user=request.user, data=request.POST)
        if form.is_valid():
            user = form.save()
            update_session_auth_hash(request, user)  # Keep the user logged in after password change
            messages.success(request, 'Your password was successfully updated!')
            return redirect('feed')
        else:
            messages.error(request, 'Please correct the error below.')
    else:
        form = PasswordChangeForm(user=request.user)
    return render(request, 'password_change.html', {'form': form})
