from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ContactMessageViewSet, QuoteRequestViewSet, GalleryItemViewSet, 
    CustomServiceViewSet, AdminProfileViewSet, FabricCatalogViewSet
)

router = DefaultRouter()
router.register(r'contacts', ContactMessageViewSet)
router.register(r'quotes', QuoteRequestViewSet)
router.register(r'gallery', GalleryItemViewSet)
router.register(r'services', CustomServiceViewSet)
router.register(r'profiles', AdminProfileViewSet)
router.register(r'fabrics', FabricCatalogViewSet)

urlpatterns = [
    path('', include(router.urls)),
]




