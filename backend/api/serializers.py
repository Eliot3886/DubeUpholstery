from rest_framework import serializers
from .models import ContactMessage, QuoteRequest, QuoteImage, GalleryItem, CustomService, AdminProfile, FabricCatalog
from django.contrib.auth.models import User

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'
        read_only_fields = ['date']

class QuoteImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuoteImage
        fields = ['id', 'image']

class QuoteRequestSerializer(serializers.ModelSerializer):
    images = QuoteImageSerializer(many=True, read_only=True)
    
    class Meta:
        model = QuoteRequest
        fields = ['id', 'name', 'phone', 'email', 'service', 'description', 'is_read', 'date', 'images']
        read_only_fields = ['date']

class GalleryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryItem
        fields = '__all__'
        read_only_fields = ['date']

class CustomServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomService
        fields = '__all__'
        read_only_fields = ['date']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class AdminProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = AdminProfile
        fields = ['id', 'user', 'profile_picture']

class FabricCatalogSerializer(serializers.ModelSerializer):
    class Meta:
        model = FabricCatalog
        fields = '__all__'
        read_only_fields = ['date']
