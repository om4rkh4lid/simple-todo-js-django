from django.shortcuts import render, reverse
from django.http.response import HttpResponse, JsonResponse
from django.views import generic
from django.core import serializers

from .models import TodoItem
from .forms import TodoItemForm

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


class TodoItemsCreateView(generic.View):
    def post(self, request, *args, **kwargs):
        if request.method == "POST" and request.is_ajax():
            # print(self.request.POST)
            form = TodoItemForm(self.request.POST)
            if form.is_valid():
                item = form.save(commit=False)
                form.save()
                response = {
                    'result': "item created successfully.",
                    'data': form.cleaned_data
                }
                return JsonResponse(response, status=201)
            else:
                return JsonResponse({'result': "Something went wrong. Please try again later."}, status=400)
        else:
            return JsonResponse({'result': "Invalid Request"}, status=300)


class TodoItemsUpdateView(generic.View):
    def post(self, request, pk, *args, **kwargs):
        if request.method == "POST" and request.is_ajax():
            # print(self.request.POST)
            instance = TodoItem.objects.get(id=pk)
            form = TodoItemForm(self.request.POST, instance=instance)
            if form.is_valid():
                item = form.save(commit=False)
                form.save()
                response = {
                    'result': "item updated successfully.",
                    'data': form.cleaned_data
                }
                return JsonResponse(response, status=200)
            else:
                return JsonResponse({'result': "Something went wrong. Please try again later."}, status=400)
        else:
            return JsonResponse({'result': "Invalid Request"}, status=300)


class TodoItemsSetStatusView(generic.View):
    def post(self, request, pk, *args, **kwargs):
        if request.method == "POST" and request.is_ajax():
            # print(self.request.POST)
            instance = TodoItem.objects.get(id=pk)
            instance.is_done = not (instance.is_done)
            instance.save()
            response = {
                'result': "item status updated successfully.",
                'data': {
                    'id': instance.id,
                    'title': instance.title,
                    'is_done': instance.is_done,
                }
            }
            return JsonResponse(response, status=200)
        else:
            return JsonResponse({'result': "Invalid Request"}, status=300)


class TodoItemsDeleteView(generic.View):
    def post(self, request, pk, *args, **kwargs):
        if request.method == "POST" and request.is_ajax():
            # print(self.request.POST)
            instance = TodoItem.objects.get(id=pk)
            instance.delete()
            print(instance)
            response = {
                'result': "item status updated created successfully.",
                'data': {
                    'id': instance.id,
                    'title': instance.title,
                    'is_done': instance.is_done,
                }
            }
            return JsonResponse(response, status=200)
        else:
            return JsonResponse({'result': "Invalid Request"}, status=300)
