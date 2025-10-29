export interface BookingData {
  departureAirport: string;
  destinationAirport: string;
  departureDate: string;
  adults: number;
  children: number;
  childAge: number;
  hotelName?: string;
  hotelPrice?: string;
}

export interface Airport {
  code: string;
  name: string;
  country: string;
}

export interface Hotel {
  name: string;
  price: string;
  rating?: string;
  location?: string;
}

export interface Flight {
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: string;
}

export interface PassengerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  passportNumber?: string;
}
