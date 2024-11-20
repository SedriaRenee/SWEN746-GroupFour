from django.contrib import admin
from .models import Post, Comment, Like, Event, Workshop

# Register your models here.
admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Like)
admin.site.register(Event)
admin.site.register(Workshop)
