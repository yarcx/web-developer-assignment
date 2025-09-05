import { Router, Request, Response } from "express";
import { createPost, deletePost, getPosts } from "../db/posts/posts";
import { NewPost } from "../db/posts/types";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const userId = req.query.userId?.toString();
  if (!userId) {
    res.status(400).send({ error: "userId is required" });
    return;
  }
  const posts = await getPosts(userId);
  res.send(posts);
});

router.post("/", async (req, res) => {
  try {
    const { title, body, user_id }: NewPost = req.body;

    const newPost: NewPost = {
      title,
      body,
      user_id,
    };

    const createdPost = await createPost(newPost);

    res.status(201).json(createdPost);
  } catch (error: any) {
    if (error.message.includes("required") || error.message === "Invalid user ID") {
      res.status(400).json({
        error: error.message,
      });
    } else {
      console.error("Error creating post:", error);
      res.status(500).json({
        error: "Internal server error",
      });
    }
  }
});

router.delete("/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    const postId = req.params.id;

    if (!postId) {
      return res.status(400).json({
        error: "Post ID is required",
      });
    }

    const deleted = await deletePost(postId);

    if (deleted) {
      res.status(200).json({
        message: "Post deleted successfully",
      });
    } else {
      res.status(404).json({
        error: "Post not found",
      });
    }
  } catch (error: any) {
    if (error?.message === "Post not found") {
      res.status(404).json({
        error: "Post not found",
      });
    } else {
      console.error("Error deleting post:", error);
      res.status(500).json({
        error: "Internal server error",
      });
    }
  }
});
export default router;
