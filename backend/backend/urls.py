from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, re_path, include
from django.shortcuts import redirect

from .views.channels import channel_list

from .views.edit_profile import edit_profile

from .views.events import create_group_event, event_list
from .views.posts import feed
from .views.profile_views import user_profile
from .views.search_views import search_users
from .views.posts import comment_create, comment_delete, like, post_create, post_delete, post_detail, post_edit, feed
from .views.auth import signup, login_view, logout_view, password_change, change_username
from .views.groups import group_list
from .views.rentals import rentals_list
from .views.workshop import workshops_list

def redirect_to_feed(request):
    return redirect('feed')

#URLConf....for each view you need to create a URL in here
urlpatterns = [
    ####User Authentication

    # Signup 
    path('signup/', signup, name='signup'),
    # Login
    path('login/', login_view, name='login'),
    # Logout
    path('logout/', logout_view, name='logout'),
    

    #List all posts
    path('', feed, name='feed'),
    # Post Create
    path('post/create/', post_create, name='post_create'),
    #View a specific post
    path('posts/<int:post_id>/', post_detail, name='post_detail'),
    #Edit Post
    path('posts/<int:post_id>/edit/', post_edit, name='post_edit'),
    # Post Delete
    path('post/<int:pk>/delete/', post_delete, name='post_delete'),
    
    
    
    # Comment on Posts
    path('post/<int:pk>/comment/', comment_create, name='comment_create'),
    # Delete Comment
    path('comment/<int:pk>/delete/', comment_delete, name='comment_delete'),
    # Like Post
    path('post/<int:pk>/like/', like, name='like'),

    # # Redirecting to Latest Username
    # re_path(r'^profile/(?!change-username/)(?P<username>\w+)/$', user_profile, name='user_profile'),
   
    ###Password and Profile Management
    # Change Username
    path('profile/change-username/', change_username, name='change_username'),
    # Password Change View
    path('password-change/', password_change, name='password_change'),
    path('profile/<str:username>/', user_profile, name='user_profile'),
    path('profile/edit/', edit_profile, name='edit_profile'),
   

    #Events/Workshops
    path('events/', event_list, name='event_list'),
    path('create-group-event/', create_group_event, name='create_group_event'),
    # path('workshop/feed/', workshop_feed, name='workshop_feed'),
    # path('workshops/', include('backend.urls_workshop')),
    path('workshops/', workshops_list, name='workshops_list'),

    path('groups/', group_list, name='group_list'),
    path('rentals/', rentals_list, name='rental_list'),
    path('channels/', channel_list, name='channel_list'),
    # path('private/messages/<str:username>/', private_message, name='private_message'),
    

    # Search Users
    path('search/', search_users, name='search_users'),

    
]
# Add the static and media URLs to the urlpatterns
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)