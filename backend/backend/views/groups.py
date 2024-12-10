# views.py
from django.shortcuts import render
from backend.models import Group

def group_list(request):
    groups = Group.objects.all()
    return render(request, 'group_list.html', {'groups': groups})
