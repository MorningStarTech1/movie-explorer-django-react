from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import filters
from rest_framework.pagination import PageNumberPagination
from .models import Movie, Principal, Name
from .serializers import MovieSerializer, PrincipalSerializer, NameSerializer
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

CACHE_TTL = 60 * 5

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

@method_decorator(cache_page(CACHE_TTL), name='list')
class MovieViewSet(ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['title', 'year', 'runtime']
    ordering = ['title']

@method_decorator(cache_page(CACHE_TTL), name='list')
class PrincipalViewSet(ModelViewSet):
    queryset = Principal.objects.all()
    serializer_class = PrincipalSerializer
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        queryset = super().get_queryset()
        tconst = self.request.query_params.get('tconst')
        if tconst:
            queryset = queryset.filter(tconst=tconst)
        return queryset

@method_decorator(cache_page(CACHE_TTL), name='list')
class NameViewSet(ModelViewSet):
    queryset = Name.objects.all()
    serializer_class = NameSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['name', 'birth_year', 'death_year']
    ordering = ['name']

    def get_queryset(self):
        queryset = super().get_queryset()
        tconst = self.request.query_params.get('tconst')
        if tconst:
            queryset = queryset.filter(principal__tconst=tconst).distinct()
        return queryset

@cache_page(CACHE_TTL)
@api_view(['GET'])
def search(request):
    query = request.GET.get('q', '')
    movies = Movie.objects.filter(title__icontains=query).order_by('title')
    paginator = StandardResultsSetPagination()
    result_page = paginator.paginate_queryset(movies, request)
    serialized_movies = MovieSerializer(result_page, many=True)
    return paginator.get_paginated_response(serialized_movies.data)