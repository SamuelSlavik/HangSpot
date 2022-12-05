from django.contrib import admin

from .models import (
    SkateSpot,
    SkateSpotType,
    BMXSpot,
    BMXSpotType,
    WalkSpot,
    PicnicSpot,
    SunsetSpot,
    SpotType
)

# Register your models here.
admin.site.register(SpotType)
admin.site.register(SkateSpot)
admin.site.register(SkateSpotType)
admin.site.register(BMXSpot)
admin.site.register(BMXSpotType)
admin.site.register(WalkSpot)
admin.site.register(PicnicSpot)
admin.site.register(SunsetSpot)
