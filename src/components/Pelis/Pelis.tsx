"use client";
import React, { useState, useEffect } from "react";
import { Movie, MovieResponse } from "../../types/movies";
import { API_KEY, BASE_URL, getImageUrl } from "../../utils/movieUtils";

const Pelis: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = async (pageNum: number, query: string = "") => {
    setLoading(true);
    setError(null);
    try {
      const url = query
        ? `${BASE_URL}/search/movie?query=${query}&api_key=${API_KEY}&language=es-MX&page=${pageNum}`
        : `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-MX&page=${pageNum}`;

      const response = await fetch(url);

      if (response.ok) {
        const data: MovieResponse = await response.json();
        setMovies(data.results);
        setTotalPages(data.total_pages);
        setPage(data.page);
      } else {
        throw new Error("Error fetching movies");
      }
    } catch (error) {
      setError("Error al cargar las películas. Por favor, intenta de nuevo.");
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(page);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchMovies(1, searchQuery);
  };

  const handleMovieClick = async (movie: Movie) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${BASE_URL}/movie/${movie.id}?api_key=${API_KEY}&language=es-MX&append_to_response=videos`
      );
      if (response.ok) {
        const detailedMovie: Movie = await response.json();
        setSelectedMovie(detailedMovie);
      } else {
        throw new Error("Error fetching movie details");
      }
    } catch (error) {
      setError(
        "Error al cargar los detalles de la película. Por favor, intenta de nuevo."
      );
      console.error("Error fetching movie details:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTrailerKey = (movie: Movie) => {
    if (movie.videos && movie.videos.results.length > 0) {
      const trailer = movie.videos.results.find(
        (video) =>
          video.site === "YouTube" &&
          (video.type === "Trailer" || video.type === "Teaser")
      );
      return trailer ? trailer.key : null;
    }
    return null;
  };

  return (
    <div className="container mx-auto pt-8 pb-8 text-slate-100 bg-slate-950">
      <h1 className="text-3xl font-bold my-4">Películas Populares</h1>

      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar películas..."
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Buscar
        </button>
      </form>

      {loading && <p>Cargando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {selectedMovie ? (
        <div className="movie-details flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <img
              src={getImageUrl(selectedMovie.poster_path)}
              alt={selectedMovie.title}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-2/3">
            <h2 className="text-3xl font-bold mb-4">{selectedMovie.title}</h2>
            <p className="mb-4">{selectedMovie.overview}</p>
            <p className="mb-2">
              Fecha de lanzamiento: {selectedMovie.release_date}
            </p>
            <p className="mb-4">
              Promedio de votos: {selectedMovie.vote_average.toFixed(1)}
            </p>
            {getTrailerKey(selectedMovie) && (
              <div className="aspect-w-16 aspect-h-10 mb-20">
                <iframe
                  src={`https://www.youtube.com/embed/${getTrailerKey(
                    selectedMovie
                  )}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-25 h-25 rounded-xl"
                ></iframe>
              </div>
            )}
            <button
              onClick={() => setSelectedMovie(null)}
              className="bg-gray-500 text-white p-2 rounded mt-4"
            >
              Volver
            </button>
          </div>
        </div>
      ) : (
        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="movie-card relative cursor-pointer"
              onClick={() => handleMovieClick(movie)}
            >
              <img
                src={getImageUrl(movie.poster_path)}
                alt={movie.title}
                className="w-full rounded-lg shadow-md"
              />
              <div className="absolute top-2 right-2 bg-yellow-500 text-black font-bold rounded-full w-10 h-10 flex items-center justify-center">
                {movie.vote_average.toFixed(1)}
              </div>
              <h3 className="text-lg font-semibold mt-2">{movie.title}</h3>
            </div>
          ))}
        </div>
      )}

      <div className=" mx-auto flex justify-center gap-4 mt-8">
        <button
          onClick={() => fetchMovies(page - 1)}
          disabled={page === 1 || loading}
          className="bg-blue-500 text-white p-2 rounded disabled:bg-gray-300"
        >
          Anterior
        </button>
        <button
          onClick={() => fetchMovies(1)}
          disabled={loading}
          className="bg-green-500 text-white p-2 rounded"
        >
          Inicio
        </button>
        <button
          onClick={() => fetchMovies(page + 1)}
          disabled={page === totalPages || loading}
          className="bg-blue-500 text-white p-2 rounded disabled:bg-gray-300"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Pelis;
