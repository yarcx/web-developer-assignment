import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Address, IState } from "./types";

export const USER_TABLE_HEADER = ["Full Name", "Email Address", "Address"];

export const USER_TABLE_DATA = [
  {
    fullName: "James Sunderland",
    email: "james.sunderland@acme.corp",
    address: "11 Katz St., Pennsylvania, Centralia, M4A2T6 ",
  },
  {
    fullName: "Angela White",
    email: "angela.white@acme.corp",
    address: "22 Baker St., New York, NY, 10001",
  },
  {
    fullName: "Michael Johnson",
    email: "michael.johnson@acme.corp",
    address: "33 Queen St., Los Angeles, CA, 90001",
  },
  {
    fullName: "Emily Davis",
    email: "emily.davis@acme.corp",
    address: "44 King St., Chicago, IL, 60601",
  },
];

export const PAGINATION_DATA = [1, 2, 3, "...", 8, 9, 10];

export const POST_CARD_DATA = [
  "I Got a Letter",
  "What a Nice Town",
  "I Love My Wife, Mary",
  "How can Anyone Eat Pizza at a Time Like This?",
];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const STATE_ACTIONS = {
  ADD_NEW_USER: "add_new_user",
  CLOSE_MODAL: "close_modal",
};

export const initialState: IState = {
  isModalOpen: false,
  modalType: "",
  modalProps: {},
};

export const QUERY_KEYS = {
  GET_USERS_LISTS: "getUsersLists",
  GET_USERS_COUNTS: "getUsersCount",
  GET_SINGLE_POST: "getSinglePost",
};

export const MUTATION_KEYS = {
  DELETE_SINGLE_POST: "deleteSinglePost",
};
export const formatAddress = (address: Address) => {
    return `${address.street}, ${address.state}, ${address.city}, ${address.zipcode}`;
}