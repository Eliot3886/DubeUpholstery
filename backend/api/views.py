from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import ContactMessage, QuoteRequest, QuoteImage, GalleryItem, CustomService, AdminProfile, FabricCatalog
from .serializers import (
    ContactMessageSerializer, QuoteRequestSerializer, QuoteImageSerializer,
    GalleryItemSerializer, CustomServiceSerializer, AdminProfileSerializer, FabricCatalogSerializer
)

class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all().order_by('-date')
    serializer_class = ContactMessageSerializer

class QuoteRequestViewSet(viewsets.ModelViewSet):
    queryset = QuoteRequest.objects.all().order_by('-date')
    serializer_class = QuoteRequestSerializer

    @action(detail=True, methods=['post'])
    def upload_images(self, request, pk=None):
        quote = self.get_object()
        images = request.FILES.getlist('images')
        for image in images:
            QuoteImage.objects.create(quote=quote, image=image)
        return Response({'status': 'images uploaded'}, status=status.HTTP_201_CREATED)

class GalleryItemViewSet(viewsets.ModelViewSet):
    queryset = GalleryItem.objects.all().order_by('-id')
    serializer_class = GalleryItemSerializer

class CustomServiceViewSet(viewsets.ModelViewSet):
    queryset = CustomService.objects.all().order_by('-id')
    serializer_class = CustomServiceSerializer

class AdminProfileViewSet(viewsets.ModelViewSet):
    queryset = AdminProfile.objects.all()
    serializer_class = AdminProfileSerializer

    def get_queryset(self):
        from django.contrib.auth.models import User
        user = User.objects.first()
        if user and not AdminProfile.objects.filter(user=user).exists():
            AdminProfile.objects.create(user=user)
        return super().get_queryset()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        user_data = request.data.get('user', {})
        
        # Update User fields if provided
        user = instance.user
        if 'username' in user_data:
            user.username = user_data['username']
        if 'first_name' in user_data:
            user.first_name = user_data['first_name']
        if 'email' in user_data:
            user.email = user_data['email']
        if 'password' in user_data and user_data['password']:
            user.set_password(user_data['password'])
        user.save()
        
        return super().update(request, *args, **kwargs)

    @action(detail=True, methods=['post'])
    def change_password(self, request, pk=None):
        profile = self.get_object()
        user = profile.user
        password = request.data.get('password')
        if password:
            user.set_password(password)
            user.save()
            return Response({'status': 'password updated'})
        return Response({'error': 'no password provided'}, status=status.HTTP_400_BAD_REQUEST)

class FabricCatalogViewSet(viewsets.ModelViewSet):
    queryset = FabricCatalog.objects.all().order_by('-date')
    serializer_class = FabricCatalogSerializer

