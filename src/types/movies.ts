export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  overview: string;
  vote_average: number;
  videos?: {
    results: {
      key: string;
      site: string;
      type: string;
    }[];
  };
}

export interface MovieResponse {
  results: Movie[];
  total_pages: number;
  page: number;
}
