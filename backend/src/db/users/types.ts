export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

export type Pagination = {
  pageNumber: number;
  pageSize: number;
  totalUsers: number;
};

export interface Address {
  id: string;
  user_id: string;
  street: string;
  state: string;
  city: string;
  zipcode: string;
}

export interface UserWithAddress extends User {
  address: Address;
}