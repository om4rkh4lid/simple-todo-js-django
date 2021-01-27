from django.shortcuts import render
from django.http.response import HttpResponse, JsonResponse
from .models import TodoItem
from django.views import generic
from django.core import serializers

# Create your views here.


class homepage(generic.TemplateView):
    template_name = 'todo/main.html'


class TodoItemsJsonView(generic.View):
    def get(self, request, *args, **kwargs):
        if request.is_ajax():
            data = TodoItem.objects.all()
            response = serializers.serialize('json', data)
            return HttpResponse(response)
        else:
            return JsonResponse({'error': "Something went wrong"}, status=300)
