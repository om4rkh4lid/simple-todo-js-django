from django.urls import path
from .views import homepage, TodoItemsJsonView

app_name = 'todo'

urlpatterns = [
    path('', homepage.as_view(), name='home'),
    path('todoitems/', TodoItemsJsonView.as_view(), name='todo-items-json'),
]
