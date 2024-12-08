# channels.py
from django.shortcuts import render
from backend.models import Channel

# This view will show the list of channels, or an under-construction message.
def channel_list(request):
    # Optionally, you can fetch channels from the database (if they exist).
    channels = Channel.objects.all()  # This will get all the channels in the DB
    
    # You can pass the channels data to the template
    return render(request, 'channels/channel_list.html', {'channels': channels})

