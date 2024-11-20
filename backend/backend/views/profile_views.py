

from django.shortcuts import get_object_or_404, render

from backend.models import Like, Post, User

# View for showing a user's profile
def user_profile(request, username):
    user = get_object_or_404(User, username=username)
    posts = Post.objects.filter(user=user)
    likes = Like.objects.filter(user=user)
    context = {
        'profile_user': user,
        'posts': posts,
        'likes': likes,
    }
    return render(request, 'user_profile.html', context)

# View for showing a other user's profile for logged out users
def guest_profile(request, username):
    user = get_object_or_404(User, username=username)
    posts = Post.objects.filter(user=user)
    return render(request, 'guest_profile.html', {'profile_user': user, 'posts': posts})
