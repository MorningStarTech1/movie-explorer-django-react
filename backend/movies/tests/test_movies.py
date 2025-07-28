import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from movies.models import Movie

@pytest.mark.django_db
def test_search_movies():
    Movie.objects.create(tconst="tt0001", title="Moana", title_type="movie", year="2016")
    Movie.objects.create(tconst="tt0002", title="Frozen", title_type="movie", year="2013")
    
    client = APIClient()
    url = reverse('search')
    
    response = client.get(url, {'q': 'Moana'})
    
    assert response.status_code == 200
    results = response.json()
    assert any("Moana" in m["title"] for m in results["results"])

@pytest.mark.django_db
def test_movies_pagination():
    for i in range(30):
        Movie.objects.create(tconst=f"tt{i}", title=f"Movie {i}", title_type="movie", year="2000")
    
    client = APIClient()
    url = reverse('movie-list')
    
    response = client.get(url, {'page': 2, 'page_size': 10})
    
    assert response.status_code == 200
    data = response.json()
    assert len(data["results"]) == 10