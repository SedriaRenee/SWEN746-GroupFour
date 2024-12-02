

from django.shortcuts import get_object_or_404, render

from backend.models import Channel, Group, Like, Post, User

# View for showing a user's profile
def user_profile(request, username):
    user = get_object_or_404(User, username=username)
    posts = Post.objects.filter(user=user)
    likes = Like.objects.filter(user=user)
    groups = Group.objects.filter(members=user)
    channels = Channel.objects.filter(followers=user)
    context = {
        'profile_user': user,
        'posts': posts,
        'likes': likes,
        'groups': groups,
        'channels': channels
    }
    return render(request, 'user_profile.html', context)
