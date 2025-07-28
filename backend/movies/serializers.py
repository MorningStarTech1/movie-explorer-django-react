from rest_framework import serializers
from .models import Movie, Principal, Name

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'

class NameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Name
        fields = '__all__'

class PrincipalSerializer(serializers.ModelSerializer):
    person = NameSerializer(source='nconst', read_only=True)

    class Meta:
        model = Principal
        fields = ['id', 'category', 'job', 'characters', 'tconst', 'nconst', 'person']
