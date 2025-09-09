"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const posts_1 = require("../db/posts/posts");
const router = (0, express_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.query.userId) === null || _a === void 0 ? void 0 : _a.toString();
    if (!userId) {
        res.status(400).send({ error: "userId is required" });
        return;
    }
    const posts = yield (0, posts_1.getPosts)(userId);
    res.send(posts);
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, body, user_id } = req.body;
        const newPost = {
            title,
            body,
            user_id,
        };
        const createdPost = yield (0, posts_1.createPost)(newPost);
        res.status(201).json(createdPost);
    }
    catch (error) {
        if (error.message.includes("required") || error.message === "Invalid user ID") {
            res.status(400).json({
                error: error.message,
            });
        }
        else {
            console.error("Error creating post:", error);
            res.status(500).json({
                error: "Internal server error",
            });
        }
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = req.params.id;
        if (!postId) {
            return res.status(400).json({
                error: "postId is required",
            });
        }
        const deleted = yield (0, posts_1.deletePost)(postId);
        if (deleted) {
            res.status(200).json({
                message: "Post deleted successfully",
            });
        }
        else {
            res.status(404).json({
                error: "Post not found",
            });
        }
    }
    catch (error) {
        if ((error === null || error === void 0 ? void 0 : error.message) === "Post not found") {
            res.status(404).json({
                error: "Post not found",
            });
        }
        else {
            console.error("Error deleting post:", error);
            res.status(500).json({
                error: "Internal server error",
            });
        }
    }
}));
exports.default = router;
