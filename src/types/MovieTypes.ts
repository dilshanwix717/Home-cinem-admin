export interface Movie {
  _id: string;
  movieId: string;
  title: string;
  year: number;
  genres: string[];
  description: string;
  isActive: boolean;
  isUpcoming: boolean;
  duration: string;
  videoLink: string;
  trailerLink: string;
  price: number;
  portraitImage?: {
    url: string;
    publicId: string;
  };
  landscapeImage?: {
    url: string;
    publicId: string;
  };
}