import type { INewPost, Post } from "../utils/types";
import { ENDPOINTS } from "./endpoints";
import http from "./http";

export const getSinglePost = async ({ userId }: { userId: string }): Promise<Post[]> => {
  try {
    const res = await http.get({
      url: ENDPOINTS.SINGLE_POSTS(userId),
    });
    return res;
  } catch (error) {
    console.error("Error fetching user count:", error);
    throw error;
  }
};

export const deleteSinglePost = async ({ postId }: { postId: string }): Promise<unknown> => {
  try {
    return http.delete({
      url: ENDPOINTS.DELETE_SINGLE_POSTS(postId),
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addSinglePost = async (payload: INewPost): Promise<Post | undefined> => {
    console.log(payload)
  try {
    return http.post<INewPost>({
      url: ENDPOINTS.POSTS,
      body: payload,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
