from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from backend.models import Post, Like
from backend.forms import PostForm, Comment, CommentForm


# List all posts
def post_list(request):
    posts = Post.objects.all().order_by('-created_at')  # Fetch posts in reverse chronological order
    return render(request, 'posts/post_list.html', {'posts': posts})


# View a specific post
def post_detail(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    return render(request, 'posts/post_detail.html', {'post': post})


# Create a new post (Requires login)
@login_required
def post_create(request):
    if request.method == 'POST':
        form = PostForm(request.POST)
        if form.is_valid():
            post = form.save(commit=False)
            post.author = request.user  # Assign the logged-in user as the author
            post.save()
            messages.success(request, 'Post created successfully!')
            return redirect('post_list')  # Redirect to the list of posts
    else:
        form = PostForm()
    return render(request, 'post_create.html', {'form': form})


# Edit a post (Requires login and ownership)
@login_required
def post_edit(request, post_id):
    post = get_object_or_404(Post, id=post_id)

    # Ensure the logged-in user is the author of the post
    if post.author != request.user:
        messages.error(request, 'You do not have permission to edit this post.')
        return redirect('post_list')

    if request.method == 'POST':
        form = PostForm(request.POST, instance=post)
        if form.is_valid():
            form.save()
            messages.success(request, 'Post updated successfully!')
            return redirect('post_detail', post_id=post.id)
    else:
        form = PostForm(instance=post)
    return render(request, 'posts/post_form.html', {'form': form})


# Delete a post (Requires login and ownership)
@login_required
def post_delete(request, post_id):
    post = get_object_or_404(Post, id=post_id)

    # Ensure the logged-in user is the author of the post
    if post.author != request.user:
        messages.error(request, 'You do not have permission to delete this post.')
        return redirect('post_list')

    post.delete()
    messages.success(request, 'Post deleted successfully!')
    return redirect('post_list')


# View for Commenting on a Post
@login_required
def comment_create(request, pk):
    post = get_object_or_404(Post, pk=pk)
    if request.method == 'POST':
        form = CommentForm(request.POST)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.user = request.user
            comment.post = post
            comment.save()
            return redirect('feed')
    else:
        form = CommentForm()
    return render(request, 'comment_create.html', {'form': form, 'post': post})

# View for Deleting a Comment
@login_required
def comment_delete(request, pk):
    comment = get_object_or_404(Comment, pk=pk, user=request.user)
    comment.delete()
    return redirect('feed')

# View for Liking a Post
@login_required
def like(request, pk):
    post = get_object_or_404(Post, pk=pk)
    like_obj, created = Like.objects.get_or_create(user=request.user, post=post)
    if not created:
        like_obj.delete()
    like_count = Like.objects.filter(post=post).count()
    return redirect('feed')