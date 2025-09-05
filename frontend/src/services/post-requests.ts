import type { Post } from "../utils/types";
import { ENDPOINTS } from "./endpoints";

export const getSinglePost = async ({ userId }: { userId: string }): Promise<Post[]> => {
  try {
    const response = await fetch(ENDPOINTS.SINGLE_POSTS(userId));
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = (await response.json()) as Post[];
    return data;
  } catch (error) {
    console.error("Error fetching user count:", error);
    throw error;
  }
};

export const deleteSinglePost = async ({ postId }: { postId: string }): Promise<unknown> => {
  try {
    const response = await fetch(ENDPOINTS.DELETE_SINGLE_POSTS(postId), {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = (await response.json()) as { message: string };
    return data;
  } catch (error) {
    console.error("Error fetching user count:", error);
    throw error;
  }
};

export const addSinglePost = async ({
  userId,
  title,
  body,
}: {
  userId: string;
  title: string;
  body: string;
}): Promise<Post> => {
  try {
    const response = await fetch(ENDPOINTS.POSTS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        title: title.trim(),
        body: body.trim(),
      }),
    });
    if (!title || title.trim().length === 0) {
      throw new Error("Invalid title: Must be a non-empty string");
    }
    if (!body || body.trim().length === 0) {
      throw new Error("Invalid body: Must be a non-empty string");
    }
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
   const data = await response.json();
   return data as Post;
  } catch (error) {
    console.error("Error fetching user count:", error);
    throw error;
  }
};
