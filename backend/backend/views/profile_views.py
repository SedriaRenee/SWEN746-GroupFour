from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from backend.models import Channel, Group, Like, Post, User

# View for showing a user's profile as JSON
def user_profile(request, username):
    user = get_object_or_404(User, username=username)
    posts = Post.objects.filter(user=user).order_by('-created_at')
    likes = Like.objects.filter(user=user)
    groups = Group.objects.filter(members=user)
    channels = Channel.objects.filter(followers=user)
    
    profile_data = {
        'username': user.username,
        'profile_picture': user.profile_picture.url if user.profile_picture else '/static/default_avatar.jpg',
        'bio': user.bio,
    }

    posts_data = [
        {
            'id': post.id,
            'content': post.content,
            'created_at': post.created_at,
            'likes_count': post.likes.count(),
            'image': post.image.url if post.image else None,
        } for post in posts
    ]
    
    likes_data = [
        {
            'id': like.id,
            'post_id': like.post.id,
        } for like in likes
    ]

    groups_data = [
        {
            'id': group.id,
            'name': group.name,
        } for group in groups
    ]

    channels_data = [
        {
            'id': channel.id,
            'name': channel.name,
        } for channel in channels
    ]

    return JsonResponse({
        'profile': profile_data,
        'posts': posts_data,
        'likes': likes_data,
        'groups': groups_data,
        'channels': channels_data,
    })
