from django.shortcuts import render
from rest_framework import viewsets
from .models import Book
from .serializers import BookSerializer
from .models import Author
from .serializers import AuthorSerializer
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
import json
import requests
from django.http import JsonResponse
from django.http import HttpResponse
from django.core.management import call_command

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class AuthorViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Author.objects.prefetch_related('books').all()
    serializer_class = AuthorSerializer

@csrf_exempt
def subscribe_email(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')

        if not email:
            return JsonResponse({'error': 'Email is required'}, status=400)

        response = requests.post(
            f'https://emailoctopus.com/api/1.6/lists/{settings.EMAILOCTOPUS_LIST_ID}/contacts',
            headers={ 'Content-Type': 'application/json' },
            json={
                'email_address': email,
                'status': 'SUBSCRIBED'
            },
            params={ 'api_key': settings.EMAILOCTOPUS_API_KEY }
        )
        if response.status_code == 200:
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'error': 'Failed to subscribe'}, status=response.status_code)

    return JsonResponse({'error': 'Invalid request method'}, status=405)