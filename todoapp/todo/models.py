from django.db import models

# Create your models here.


class TodoItem(models.Model):
    title = models.TextField()
    is_done = models.BooleanField(default=False)

    class Meta:
        ordering = ['is_done', '-id']

    def __str__(self):
        return self.title
