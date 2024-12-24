export interface TVShow {
  id: number;
  name: string;
  poster_path: string;
  first_air_date: string;
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

export interface TVShowResponse {
  results: TVShow[];
  total_pages: number;
  page: number;
}
