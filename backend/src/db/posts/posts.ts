import { connection } from "../connection";
import {
  deletePostTemplate,
  insertPostTemplate,
  selectPostByIdTemplate,
  selectPostsTemplate,
} from "./query-tamplates";
import { Post, NewPost } from "./types";
import { v4 as uuidv4 } from "uuid";

export const getPosts = (userId: string): Promise<Post[]> =>
    new Promise((resolve, reject) => {

    connection.all(selectPostsTemplate, [userId], (error, results) => {
        if (error) {
        reject(error);
      }
      resolve(results as Post[]);
    });
  });

export const deletePost = (postId: string): Promise<boolean> =>
  new Promise((resolve, reject) => {
    connection.get<Post>(selectPostByIdTemplate, [postId], (error, result) => {
      if (error) {
        reject(error);
        return;
      }

      if (!result) {
        reject(new Error("Post not found"));
        return;
      }

      connection.run(deletePostTemplate, [postId], function (error) {
        if (error) {
          reject(error);
          return;
        }

        resolve(this.changes > 0);
      });
    });
  });

export const createPost = (newPost: NewPost): Promise<Post> =>
    new Promise((resolve, reject) => {
    if (!newPost.title) {
      reject(new Error("Title is required"));
      return;
    }

    if (!newPost.body) {
      reject(new Error("Body is required"));
      return;
    }

    if (!newPost.user_id) {
      reject(new Error("User ID is required"));
      return;
    }

    const postId = uuidv4();
    const createdAt = new Date().toISOString();

    const post: Post = {
      id: postId,
      user_id: newPost.user_id,
      title: newPost.title,
      body: newPost.body,
      created_at: createdAt,
    };

    connection.run(
      insertPostTemplate,
      [post.id, post.user_id, post.title, post.body, post.created_at],
      function (error) {
        if (error) {
          if (error.message.includes("FOREIGN KEY constraint failed")) {
            reject(new Error("Invalid user ID"));
            return;
          }
          reject(error);
          return;
        }

        resolve(post);
      }
    );
  });
