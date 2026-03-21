from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class ContactMessage(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True, null=True)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    date = models.DateTimeField(default=timezone.now)

class QuoteRequest(models.Model):
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=50)
    email = models.EmailField()
    service = models.CharField(max_length=255)
    description = models.TextField()
    is_read = models.BooleanField(default=False)
    date = models.DateTimeField(default=timezone.now)

class QuoteImage(models.Model):
    quote = models.ForeignKey(QuoteRequest, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='quotes/')

class GalleryItem(models.Model):
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    img = models.ImageField(upload_to='gallery/', blank=True, null=True)
    date = models.DateTimeField(default=timezone.now)

class CustomService(models.Model):
    title = models.CharField(max_length=255)
    desc = models.TextField()
    img = models.ImageField(upload_to='services/', blank=True, null=True)
    date = models.DateTimeField(default=timezone.now)

class AdminProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField(upload_to='profiles/', blank=True, null=True)

class FabricCatalog(models.Model):
    image = models.ImageField(upload_to='fabrics/')
    title = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title if self.title else f"Fabric {self.id}"
