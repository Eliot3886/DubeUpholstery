import os
import django
import signal

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.core.files.base import ContentFile
from django.core.files.storage import default_storage

def handler(signum, frame):
    raise Exception("Upload timed out after 10 seconds")

signal.signal(signal.SIGALRM, handler)
signal.alarm(15)

# Test storage backend
print(f"Current storage backend: {default_storage.__name__ if hasattr(default_storage, '__name__') else default_storage.__class__}")

test_filename = 'integration_test_v2.txt'
test_content = b'Testing explicit deployment persistence configurations.'

try:
    print("Attempting upload to Cloudinary...")
    path = default_storage.save(test_filename, ContentFile(test_content))
    url = default_storage.url(path)
    print(f"SUCCESS: Uploaded to {path}")
    print(f"URL: {url}")
except Exception as e:
    print(f"ERROR: {e}")
finally:
    signal.alarm(0)
