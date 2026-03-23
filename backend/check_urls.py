import os
import django
import sys

# Set up Django environment
sys.path.append(os.getcwd())
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from api.models import GalleryItem, CustomService, FabricCatalog

print("--- Testing Image URLs ---")

print("\nGallery Items:")
for item in GalleryItem.objects.all()[:5]:
    try:
        print(f"ID: {item.id}, Title: {item.title}, URL: {item.img.url if item.img else 'No Image'}")
    except Exception as e:
        print(f"ID: {item.id}, Error: {e}")

print("\nCustom Services:")
for item in CustomService.objects.all()[:5]:
    try:
        print(f"ID: {item.id}, Title: {item.title}, URL: {item.img.url if item.img else 'No Image'}")
    except Exception as e:
        print(f"ID: {item.id}, Error: {e}")

print("\nFabric Catalog:")
for item in FabricCatalog.objects.all()[:5]:
    try:
        print(f"ID: {item.id}, Title: {item.title}, URL: {item.image.url if item.image else 'No Image'}")
    except Exception as e:
        print(f"ID: {item.id}, Error: {e}")
