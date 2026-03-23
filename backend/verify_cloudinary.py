import os
import django
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

# Test storage backend
print(f"Current storage backend: {default_storage.__class__}")

test_filename = 'test_cloudinary_upload.txt'
test_content = b'This is a Cloudinary storage integration test.'

try:
    path = default_storage.save(test_filename, ContentFile(test_content))
    url = default_storage.url(path)
    print(f"File uploaded successfully to: {path}")
    print(f"URL: {url}")
except Exception as e:
    print(f"Upload failed: {e}")
