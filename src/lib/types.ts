export type ItineraryDay = {
  day: string;
  title: string;
  description: string;
};

export type TravelPackage = {
  id: string;
  name: string;
  country: string;
  category: string;
  price: number;
  duration: string;
  departure: string;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  highlights: string[];
  itinerary: ItineraryDay[];
};

export type BookingStatus = "Confirmed" | "Pending";

export type Booking = {
  id: string;
  packageId: string;
  name: string;
  image: string;
  price: number;
  departure: string;
  status: BookingStatus;
};

export type Testimonial = {
  quote: string;
  author: string;
  from: string;
  photo: string;
  rating: string;
};

export const CATEGORIES = ["Beach", "Adventure", "Culture", "Cruise"] as const;
