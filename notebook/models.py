from django.db import models
from django.contrib.auth.models import User
from datetime import timedelta
import uuid

class Entry(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=120, null=True)
    body = models.TextField()
    favorite = models.BooleanField(default=False, null=True)
    date_created = models.DateTimeField(auto_now_add=True, null=True)
    date_updated = models.DateTimeField(auto_now=True, null=True)
    recently_viewed = models.DateTimeField(auto_now=True, null=True)

    @property
    def is_updated(self):
        publish_window = self.date_created + timedelta(seconds=1)
        return self.date_updated > publish_window

    def __str__(self) -> str:
        return self.body

    def save_model(self, request, obj, form, change):
        obj.author = request.user
        super().save_model(request, obj, form, change)

    class Meta:
        ordering = ['-recently_viewed']