from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MovieViewSet, PrincipalViewSet, NameViewSet
from movies.views import search

router = DefaultRouter()
router.register(r'movies', MovieViewSet)
router.register(r'principals', PrincipalViewSet)
router.register(r'names', NameViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('search/', search, name='search')
]