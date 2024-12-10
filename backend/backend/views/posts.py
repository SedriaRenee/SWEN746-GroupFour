import json
from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from backend.models import Post, Like
from backend.forms import PostForm, Comment, CommentForm
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
# List all posts
def feed(request):
    posts = Post.objects.all().order_by('-created_at')
    
    # If there are no posts, return an empty list
    if not posts.exists():
        return JsonResponse([], safe=False)

    # Serialize post data
    post_data = [
        {
            'id': post.id,
            'user': {
                'profile_picture': post.user.profile_picture.url if post.user.profile_picture else None,
                'username': post.user.username,
            },
            'content': post.content,
            'created_at': post.created_at,
            'likes_count': post.likes.count(),
        } for post in posts
    ]
    
    # Return JSON response with post data
    return JsonResponse(post_data, safe=False)
# View a specific post
def post_detail(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    post_data = {
        'id': post.id,
        'author': post.user.username,
        'content': post.content,
        'created_at': post.created_at,
        'likes_count': post.likes.count(),
    }
    return JsonResponse(post_data)


# Create a new post (Requires login)
@method_decorator(csrf_exempt, name='dispatch')
@login_required
def post_create(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            form = PostForm(data)
            if form.is_valid():
                post = form.save(commit=False)
                post.user = request.user
                post.save()
                return JsonResponse({'message': 'Post created successfully!', 'post_id': post.id}, status=201)
            return JsonResponse({'error': form.errors}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

# Edit a post (Requires login and ownership)
@method_decorator(csrf_exempt, name='dispatch')
@login_required
def post_edit(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    if post.user != request.user:
        return JsonResponse({'error': 'You do not have permission to edit this post.'}, status=403)

    if request.method == 'PUT':
        try:
            data = json.loads(request.body)
            form = PostForm(data, instance=post)
            if form.is_valid():
                post = form.save()
                return JsonResponse({'message': 'Post updated successfully!', 'post_id': post.id})
            return JsonResponse({'error': form.errors}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)


# Delete a post (Requires login and ownership)
@method_decorator(csrf_exempt, name='dispatch')
@login_required
def post_delete(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    if post.user != request.user:
        return JsonResponse({'error': 'You do not have permission to delete this post.'}, status=403)

    if request.method == 'DELETE':
        post.delete()
        return JsonResponse({'message': 'Post deleted successfully!'})
    return JsonResponse({'error': 'Invalid request method'}, status=405)


# Create a comment on a post
@method_decorator(csrf_exempt, name='dispatch')
@login_required
def comment_create(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            form = CommentForm(data)
            if form.is_valid():
                comment = form.save(commit=False)
                comment.user = request.user
                comment.post = post
                comment.save()
                return JsonResponse({'message': 'Comment added successfully!', 'comment_id': comment.id}, status=201)
            return JsonResponse({'error': form.errors}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)


# Delete a comment
@method_decorator(csrf_exempt, name='dispatch')
@login_required
def comment_delete(request, comment_id):
    comment = get_object_or_404(Comment, id=comment_id, user=request.user)
    if request.method == 'DELETE':
        comment.delete()
        return JsonResponse({'message': 'Comment deleted successfully!'})
    return JsonResponse({'error': 'Invalid request method'}, status=405)


# Like or Unlike a Post
@method_decorator(csrf_exempt, name='dispatch')
@login_required
def like(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    if request.method == 'POST':
        like_obj, created = Like.objects.get_or_create(user=request.user, post=post)
        if not created:
            like_obj.delete()
        return JsonResponse({'likes_count': post.likes.count()})
    return JsonResponse({'error': 'Invalid request method'}, status=405)