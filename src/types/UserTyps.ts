export interface PurchasedMovie {
  movieId: string;
  title: string;
}

export interface User {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  isActive: boolean;
  purchasedMovies: PurchasedMovie[];
}
