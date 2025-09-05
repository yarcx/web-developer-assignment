import type {  UserWithAddress } from "../utils/types";
import { ENDPOINTS } from "./endpoints";

export const getUserLists = async ({
  pageNumber,
  pageSize,
}: {
  pageNumber: string;
  pageSize: string;
}): Promise<UserWithAddress[]> => {
  try {
    const response = await fetch(ENDPOINTS.USERS(pageNumber, pageSize));
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = (await response.json());
    return data;
  } catch (error) {
    console.error("Error fetching user count:", error);
    throw error;
  }
};

export const getUsersCount = async (): Promise<number> => {
  try {
    const response = await fetch(ENDPOINTS.USERS_COUNT);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = (await response.json()) as number;
    return data;
  } catch (error) {
    console.error("Error fetching user count:", error);
    throw error;
  }
};
