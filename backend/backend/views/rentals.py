from django.http import JsonResponse
from backend.models import Rental

def rentals_list(request):
    rentals = Rental.objects.all().values("id", "name", "description")
    return JsonResponse(list(rentals), safe=False)
