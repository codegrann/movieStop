export interface User {
  id: string;
  email: string;
  name: string;
  favorites: number[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  backdrop_path?: string | null;
  genres?: { id: number; name: string }[];
  genre_ids?: number[];
  runtime?: number;
  credits?: {
    cast: { id: number; name: string; character: string; profile_path: string | null }[];
    crew: { id: number; name: string; job: string }[];
  };
}

export interface HeroMovie extends Movie {
  backdrop_path: string;
}
