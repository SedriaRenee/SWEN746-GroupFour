
from django.shortcuts import redirect, render
from backend.forms import WorkshopForm
from backend.models import Workshop
from django.contrib.auth.decorators import login_required

def workshop_feed(request):
    workshops = Workshop.objects.all().order_by('-time')
    return render(request, 'workshop_feed.html', {'workshops': workshops})

@login_required
def create_workshop(request):
    if request.method == 'POST':
        form = WorkshopForm(request.POST, request.FILES)
        if form.is_valid():
            workshop = form.save(commit=False)
            workshop.host = request.user
            workshop.save()
            return redirect('feed')
    else:
        form = WorkshopForm()
    return render(request, 'create_workshop.html', {'form': form})