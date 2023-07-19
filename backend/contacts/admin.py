from django.contrib import admin

from .models import Contact


@admin.register(Contact)
class SettingsAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "phone")
    list_display_links = (
        "id",
        "name",
        "phone"
    )
    readonly_fields = ("id",)
