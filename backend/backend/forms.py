from django import forms

from .models import Post, Comment, Event, Workshop, User
# from django.contrib.auth.models import User

class UsernameChangeForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['username']

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['content']

class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ['content']

class EventForm(forms.ModelForm):
    class Meta:
        model = Event
        fields = ['title', 'description', 'date', 'location', 'food_type', 'allergy_friendly', 'preferences', 'group_type']
        widgets = {
            'date': forms.DateTimeInput(attrs={'type': 'datetime-local'}),
        }

class WorkshopForm(forms.ModelForm):
    class Meta:
        model = Workshop
        fields = ['name', 'time', 'tags', 'description', 'photos', 'video_url', 'eventChannel']



class UserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = [
            'first_name', 
            'last_name', 
            'bio', 
            'profile_picture',
            'username', 
            'email', 
            'phoneNumber', 
            'tags',
            'password',
            'age',
            'years_at_rit'
        ]



class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['content', 'image']