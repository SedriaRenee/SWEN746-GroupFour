from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from backend.models import Event
from backend.forms import EventForm


# List all events
def event_list(request):
    sort_by = request.GET.get('sort_by', 'date')  # Default to 'date' if no sort parameter is provided

    if sort_by == 'date':
        events = Event.objects.all().order_by('date')  # Adjust according to your model field
    elif sort_by == 'host_type':
        events = Event.objects.all().order_by('host_type')  # Adjust according to your model field
    else:
        events = Event.objects.all()  # Default to all events if the sort is unknown

    # Convert events to a dictionary format suitable for JSON response
    events_data = list(events.values())  # You can specify fields like `id`, `name`, `date`, etc.
    return JsonResponse(events_data, safe=False)


# View a specific event
def event_detail(request, event_id):
    event = get_object_or_404(Event, id=event_id)
    return render(request, 'events/event_detail.html', {'event': event})


# Create a new event (Requires login)
@login_required
def create_group_event(request):
    if request.method == 'POST':
        form = EventForm(request.POST)
        if form.is_valid():
            event = form.save(commit=False)
            event.host_type = "Host"  # Assuming only hosts can create this type of event
            event.group_type = "Restaurant Hop"  # This specifies it's a group event for restaurant hopping
            event.save()
            return redirect('event_list')  # Redirect to the event listing page after creation
    else:
        form = EventForm()
    return render(request, 'events/create_group_event.html', {'form': form})

# Edit an event (Requires login and ownership)
@login_required
def event_edit(request, event_id):
    event = get_object_or_404(Event, id=event_id)

    # Ensure the logged-in user is the organizer of the event
    if event.organizer != request.user:
        messages.error(request, 'You do not have permission to edit this event.')
        return redirect('event_list')

    if request.method == 'POST':
        form = EventForm(request.POST, instance=event)
        if form.is_valid():
            form.save()
            messages.success(request, 'Event updated successfully!')
            return redirect('event_detail', event_id=event.id)
    else:
        form = EventForm(instance=event)
    return render(request, 'events/event_form.html', {'form': form})


# Delete an event (Requires login and ownership)
@login_required
def event_delete(request, event_id):
    event = get_object_or_404(Event, id=event_id)

    # Ensure the logged-in user is the organizer of the event
    if event.organizer != request.user:
        messages.error(request, 'You do not have permission to delete this event.')
        return redirect('event_list')

    event.delete()
    messages.success(request, 'Event deleted successfully!')
    return redirect('event_list')