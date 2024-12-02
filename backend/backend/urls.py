from django.urls import path, re_path, include
from django.shortcuts import redirect

from .views.edit_profile import edit_profile

from .views.events import create_group_event, event_list
from .views.post_views import feed
from .views.profile_views import user_profile
from .views.search_views import search_users
from .views.posts import comment_create, comment_delete, like, post_create, post_delete, post_detail, post_edit, post_list
from .views.auth import signup, login_view, logout_view, password_change, change_username
from .views.workshop import workshop_feed

def redirect_to_feed(request):
    return redirect('feed')

#URLConf....for each view you need to create a URL in here
urlpatterns = [
    # path('', redirect_to_feed),
    # Signup Page
    path('signup/', signup, name='signup'),
    # Login
    # path('', login_view, name='login'),
    path('login/', login_view, name='login'),
    # Logout
    path('logout/', logout_view, name='logout'),
    # Feed Page
    path('feed/', feed, name='feed'),
    # Post Create
    path('post/create/', post_create, name='post_create'),
    # Post Delete
    path('post/<int:pk>/delete/', post_delete, name='post_delete'),
    # Comment on Posts
    path('post/<int:pk>/comment/', comment_create, name='comment_create'),
    # Delete Comment
    path('comment/<int:pk>/delete/', comment_delete, name='comment_delete'),
    # Like Post
    path('post/<int:pk>/like/', like, name='like'),
    path('posts/', post_list, name='post_list'),
    path('posts/<int:post_id>/', post_detail, name='post_detail'),
    path('posts/<int:post_id>/edit/', post_edit, name='post_edit'),
    # Redirecting to Latest Username
    re_path(r'^profile/(?!change-username/)(?P<username>\w+)/$', user_profile, name='user_profile'),
    # # For fetching user the username on posts
    # path('guest/profile/<str:username>/', guest_profile, name='guest_profile'),
    # Change Username
    path('profile/change-username/', change_username, name='change_username'),
        # Password Change View
    path('password-change/', password_change, name='password_change'),
    # Search Users
    path('search/', search_users, name='search_users'),
    path('', event_list, name='event_list'),
    path('create-group-event/', create_group_event, name='create_group_event'),
    path('workshop/feed/', workshop_feed, name='workshop_feed'),
    path('workshops/', include('backend.urls_workshop')),
    path('profile/<str:username>/', user_profile, name='user_profile'),
    path('profile/edit/', edit_profile, name='edit_profile'),
    path('post/create/', post_create, name='post_create'),

    
]