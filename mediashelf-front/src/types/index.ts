export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  createdAt: string;
}

export interface Media {
  id: number;
  title: string;
  description: string;
  userId: number;
  createdAt: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
  averageRating?: number;
  totalReviews?: number;
  reviews?: Review[];
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
  userId: number;
  mediaId: number;
  createdAt: string;
  user?: {
    id: number;
    name: string;
  };
  media?: {
    id: number;
    title: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  message: string;
}
