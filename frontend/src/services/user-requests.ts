import type { UserWithAddress } from "../utils/types";
import { ENDPOINTS } from "./endpoints";
import http from "./http";

export const getUserLists = async ({
  pageNumber,
  pageSize,
}: {
  pageNumber: string;
  pageSize: string;
}): Promise<UserWithAddress[]> => {
  try {
    return await http.get({
      url: ENDPOINTS.USERS(pageNumber, pageSize),
    });
  } catch (error) {
    console.error("Error fetching user count:", error);
    throw error;
  }
};

export const getUsersCount = async (): Promise<number> => {
  try {
    const res = await http.get({
      url: ENDPOINTS.USERS_COUNT,
    });
      return res?.count
  } catch (error) {
    console.error("Error fetching user count:", error);
    throw error;
  }
};
