from django.contrib import admin
from .models import ContactMessage, QuoteRequest, QuoteImage, GalleryItem, CustomService, AdminProfile, FabricCatalog

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'date', 'is_read')
    list_filter = ('is_read', 'date')

@admin.register(QuoteRequest)
class QuoteRequestAdmin(admin.ModelAdmin):
    list_display = ('name', 'service', 'date', 'is_read')
    list_filter = ('is_read', 'date', 'service')

@admin.register(QuoteImage)
class QuoteImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'quote')

@admin.register(GalleryItem)
class GalleryItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'date')
    list_filter = ('category', 'date')

@admin.register(CustomService)
class CustomServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'date')

@admin.register(AdminProfile)
class AdminProfileAdmin(admin.ModelAdmin):
    list_display = ('user',)

@admin.register(FabricCatalog)
class FabricCatalogAdmin(admin.ModelAdmin):
    list_display = ('title', 'date')
