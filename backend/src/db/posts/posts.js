"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = exports.deletePost = exports.getPosts = void 0;
const connection_1 = require("../connection");
const query_tamplates_1 = require("./query-tamplates");
const uuid_1 = require("uuid");
const getPosts = (userId) => new Promise((resolve, reject) => {
    connection_1.connection.all(query_tamplates_1.selectPostsTemplate, [userId], (error, results) => {
        if (error) {
            reject(error);
        }
        resolve(results);
    });
});
exports.getPosts = getPosts;
const deletePost = (postId) => new Promise((resolve, reject) => {
    connection_1.connection.get(query_tamplates_1.selectPostByIdTemplate, [postId], (error, result) => {
        if (error) {
            reject(error);
            return;
        }
        if (!result) {
            reject(new Error("Post not found"));
            return;
        }
        connection_1.connection.run(query_tamplates_1.deletePostTemplate, [postId], function (error) {
            if (error) {
                reject(error);
                return;
            }
            resolve(this.changes > 0);
        });
    });
});
exports.deletePost = deletePost;
const createPost = (newPost) => new Promise((resolve, reject) => {
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
    const postId = (0, uuid_1.v4)();
    const createdAt = new Date().toISOString();
    const post = {
        id: postId,
        user_id: newPost.user_id,
        title: newPost.title,
        body: newPost.body,
        created_at: createdAt,
    };
    connection_1.connection.run(query_tamplates_1.insertPostTemplate, [post.id, post.user_id, post.title, post.body, post.created_at], function (error) {
        if (error) {
            if (error.message.includes("FOREIGN KEY constraint failed")) {
                reject(new Error("Invalid user ID"));
                return;
            }
            reject(error);
            return;
        }
        resolve(post);
    });
});
exports.createPost = createPost;
