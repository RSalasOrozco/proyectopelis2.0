"use client";
import React, { useState, useEffect } from "react";
import { TVShow, TVShowResponse } from "../../types/tv";
import { API_KEY, BASE_URL, getImageUrl } from "../../utils/movieUtils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Series: React.FC = () => {
  const [tvShows, setTVShows] = useState<TVShow[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedShow, setSelectedShow] = useState<TVShow | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTVShows = async (pageNum: number, query: string = "") => {
    setLoading(true);
    setError(null);
    try {
      const url = query
        ? `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${query}&language=es-ES&page=${pageNum}`
        : `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=es-ES&page=${pageNum}`;

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_KEY}`
        }
      };

      const response = await fetch(url, options);

      if (response.ok) {
        const data: TVShowResponse = await response.json();
        setTVShows(data.results);
        setTotalPages(data.total_pages);
        setPage(data.page);
      } else {
        throw new Error("Error fetching TV shows");
      }
    } catch (error) {
      setError("Error al cargar las series. Por favor, intenta de nuevo.");
      console.error("Error fetching TV shows:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTVShows(page);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTVShows(1, searchQuery);
  };

  const handleShowClick = async (show: TVShow) => {
    setLoading(true);
    setError(null);
    try {
      const url = `${BASE_URL}/tv/${show.id}?api_key=${API_KEY}&language=es-ES&append_to_response=videos`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_KEY}`
        }
      };

      const response = await fetch(url, options);
      if (response.ok) {
        const detailedShow: TVShow = await response.json();
        setSelectedShow(detailedShow);
      } else {
        throw new Error("Error fetching TV show details");
      }
    } catch (error) {
      setError(
        "Error al cargar los detalles de la serie. Por favor, intenta de nuevo."
      );
      console.error("Error fetching TV show details:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTrailerKey = (show: TVShow) => {
    if (show.videos && show.videos.results.length > 0) {
      const trailer = show.videos.results.find(
        (video) =>
          video.site === "YouTube" &&
          (video.type === "Trailer" || video.type === "Teaser")
      );
      return trailer ? trailer.key : null;
    }
    return null;
  };

  return (
    <div className="container mx-auto pt-8 pb-8 text-slate-100">
      <h1 className="text-3xl font-bold my-4">Series Populares</h1>

      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar series..."
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Buscar
        </button>
      </form>

      {loading && <p>Cargando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {selectedShow ? (
        <div className="tv-show-details flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <img
              src={getImageUrl(selectedShow.poster_path)}
              alt={selectedShow.name}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-2/3">
            <h2 className="text-3xl font-bold mb-4">{selectedShow.name}</h2>
            <p className="mb-4">{selectedShow.overview}</p>
            <p className="mb-2">
              Fecha de estreno: {selectedShow.first_air_date}
            </p>
            <p className="mb-4">
              Promedio de votos: {selectedShow.vote_average.toFixed(1)}
            </p>
            {getTrailerKey(selectedShow) && (
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <iframe
                  src={`https://www.youtube.com/embed/${getTrailerKey(
                    selectedShow
                  )}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-lg"
                ></iframe>
              </div>
            )}
            <Button onClick={() => setSelectedShow(null)} variant="secondary">
              Volver
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tvShows.map((show) => (
            <div
              key={show.id}
              className="tv-show-card relative cursor-pointer"
              onClick={() => handleShowClick(show)}
            >
              <img
                src={getImageUrl(show.poster_path)}
                alt={show.name}
                className="w-full rounded-lg shadow-md"
              />
              <div className="absolute top-2 right-2 bg-yellow-500 text-black font-bold rounded-full w-10 h-10 flex items-center justify-center">
                {show.vote_average.toFixed(1)}
              </div>
              <h3 className="text-lg font-semibold mt-2">{show.name}</h3>
            </div>
          ))}
        </div>
      )}

      <div className="mx-auto flex justify-center gap-4 mt-8">
        <button
          onClick={() => fetchTVShows(page - 1)}
          disabled={page === 1 || loading}
          className="bg-blue-500 text-white p-2 rounded disabled:bg-gray-300"
        >
          Anterior
        </button>
        <button
          onClick={() => fetchTVShows(1)}
          disabled={loading}
          className="bg-green-500 text-white p-2 rounded"
        >
          Inicio
        </button>
        <button
          onClick={() => fetchTVShows(page + 1)}
          disabled={page === totalPages || loading}
          className="bg-blue-500 text-white p-2 rounded disabled:bg-gray-300"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Series;
