from django.http import JsonResponse
from backend.models import Workshop

def workshops_list(request):
    workshops = Workshop.objects.all().values(
        "id", "name", "time", "tags", "description", "photos", "video_url"
    )
    return JsonResponse(list(workshops), safe=False)