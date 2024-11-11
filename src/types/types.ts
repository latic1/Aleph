
export interface PropertiesProp {
  id: number;
  images: string[];
  title: string;
  location: string;
  rating: number;
  features: {
    baths: number;
    beds: number;
    guests: string;
  };
  price: number;
  currency: string;
  perNight: boolean;
  description: string;
  space: string;
  whatWeOffer: string[];
  reviews: {
    name: string;
    image: string;
    date: string;
    comment: string;
    rating: number;
  }[];
}


export interface IProperties {
  id: number
  location: string,
  price: string
  image_url: string
  type: string
  description: string
  contact: string
}

// ====== USER PARAMS
export interface UserLogin {
  email: string;
  password: string;
}

export interface CreateUserParams {
  firstName: string
  lastName: string
  email: string
  password: string
  photo?: string
}

export interface UserParams {
  _id: string
  firstName: string
  lastName: string
  email: string
  token: string
}

export interface User {
  email: string;
  password: string;
  // Add more fields as needed
}

export interface LoginResponseType {
  error: boolean;
  status_code: number;
  data: {
    message?: string;
    token?: string;
  };
}


// error: boolean,
// status_code: number
// data: {}