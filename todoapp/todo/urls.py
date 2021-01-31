from django.urls import path
from .views import *

app_name = 'todo'

urlpatterns = [
    path('', homepage.as_view(), name='home'),
    path('todoitems/', TodoItemsJsonView.as_view(), name='todo-items-json'),
    path('create/', TodoItemsCreateView.as_view(), name='todo-create'),
    path('update/<int:pk>', TodoItemsUpdateView.as_view(), name='todo-update'),
    path('updateStatus/<int:pk>', TodoItemsSetStatusView.as_view(),
         name='todo-update-status'),
    path('delete/<int:pk>', TodoItemsDeleteView.as_view(), name='todo-delete'),
]
