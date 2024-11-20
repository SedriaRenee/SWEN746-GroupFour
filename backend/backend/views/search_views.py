# View for searching users
from django.shortcuts import render
from backend.models import User
from django.db.models import Q


def search_users(request):
    query = request.GET.get('q', '')
    users = User.objects.filter(
        Q(username__icontains=query) |
        Q(first_name__icontains=query) |
        Q(last_name__icontains=query)
    )
    return render(request, 'search_users.html', {'users': users, 'query': query})

