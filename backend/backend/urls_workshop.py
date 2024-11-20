from django.urls import path
from .views.workshop import create_workshop

urlpatterns = [
    path('create/', create_workshop, name='create_workshop'),
]