
from django.shortcuts import render
from backend.models import Post

# View for Logged In User Feed and Logged Out User Feed
def feed(request):
    posts = Post.objects.all().order_by('-created_at')
    if request.user.is_authenticated:
        return render(request, 'feed.html', {'posts': posts})
    else:
        return render(request, 'guest_feed.html', {'posts': posts})
 