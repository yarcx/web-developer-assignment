type IModalProps = {
  [key: string]: unknown;
};

export interface IState {
  isModalOpen: boolean;
  modalType: string;
  modalProps: IModalProps;
}

export interface IAppContextStore {
  closeModal: () => void;
  openModal: (type: string, data?: unknown) => void;
  state: IState;
}

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

export interface Post {
  id: number;
  user_id: number;
  title: string;
  body: string;
  created_at: string;
}


export interface PaginationProps {
  currentPage: number;
  gotoPrev: () => void;
  gotoNext: () => void;
  gotoPage: (pageNumber: number) => void;
}
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