from django.contrib import admin

from .models import (
    SkateSpot,
    SkateSpotType,
    BMXSpot,
    BMXSpotType,
    WalkSpot,
    PicnicSpot,
    SunsetSpot,
    SpotType,
    SpotImage
)


class SpotImageAdmin(admin.StackedInline):
    model = SpotImage


class SkateSpotAdmin(admin.ModelAdmin):
    inlines = [SpotImageAdmin]

    class Meta:
        model = SkateSpot


class BMXSpotAdmin(admin.ModelAdmin):
    inlines = [SpotImageAdmin]

    class Meta:
        model = BMXSpot


class WalkSpotAdmin(admin.ModelAdmin):
    inlines = [SpotImageAdmin]

    class Meta:
        model = WalkSpot


class PicnicSpotAdmin(admin.ModelAdmin):
    inlines = [SpotImageAdmin]

    class Meta:
        model = PicnicSpot


class SunsetSpotAdmin(admin.ModelAdmin):
    inlines = [SpotImageAdmin]

    class Meta:
        model = SunsetSpot


# Register your models here.
admin.site.register(SpotType)
admin.site.register(SkateSpot, SkateSpotAdmin)
admin.site.register(SkateSpotType)
admin.site.register(BMXSpot, BMXSpotAdmin)
admin.site.register(BMXSpotType)
admin.site.register(WalkSpot, WalkSpotAdmin)
admin.site.register(PicnicSpot, PicnicSpotAdmin)
admin.site.register(SunsetSpot, SunsetSpotAdmin)
