from .models import TodoItem
from django.forms import ModelForm


class TodoItemForm(ModelForm):
    class Meta:
        model = TodoItem
        fields = ("title",)
