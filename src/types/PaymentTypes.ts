export interface Payment {
  _id: string;
  userId: string;
  amount: number;
  date: string;
  purchasedMovies: { movieId: string; title: string }[];
  status: "pending" | "completed" | "failed";
}

export interface RawPayment {
  _id: string;
  userId: string;
  userName: string;
  movieId: string;
  movieTitle: string;
  status: string;
  amount: number;
  date: string;
  purchasedMovies: { movieId: string; title: string }[];
}

export interface PaymentTableProps {
  payments: Payment[];
  onSort: (field: "amount" | "date") => void;
  sortField: "amount" | "date";
  sortOrder: "asc" | "desc";
}
