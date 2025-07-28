import os
import sqlite3
from django.core.management.base import BaseCommand
from movies.models import Movie, Principal, Name
from django.conf import settings

class Command(BaseCommand):
    def handle(self, *args, **options):
        source_db = os.path.join(settings.BASE_DIR, os.pardir, "imdb_subset.db")
        source_db = os.path.abspath(source_db)
        conn = sqlite3.connect(source_db)
        cursor = conn.cursor()

        cursor.execute("SELECT tconst, titleType, primaryTitle, originalTitle, isAdult, startYear, endYear, runtimeMinutes, genres, averageRating, numVotes FROM movies")
        movies = cursor.fetchall()
        self.stdout.write(self.style.SUCCESS(f"Importing {len(movies)} movies..."))
        for m in movies:
            Movie.objects.update_or_create(
                tconst=m[0],
                defaults={
                    "title_type": m[1],
                    "title": m[2],
                    "original_title": m[3],
                    "is_adult": bool(int(m[4])) if m[4] else False,
                    "year": m[5],
                    "end_year": m[6],
                    "runtime": m[7],
                    "genre": m[8],
                    "average_rating": float(m[9]) if m[9] else None,
                    "num_votes": int(m[10]) if m[10] else None,
                }
            )

        self.stdout.write(self.style.SUCCESS("IMDb data import complete."))
        conn.close()
