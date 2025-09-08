"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectPostByIdTemplate = exports.insertPostTemplate = exports.deletePostTemplate = exports.selectPostsTemplate = void 0;
exports.selectPostsTemplate = `
SELECT *
FROM posts
WHERE user_id = ?
`;
exports.deletePostTemplate = `
  DELETE FROM posts WHERE id = ?
`;
exports.insertPostTemplate = `
  INSERT INTO posts (id, user_id, title, body, created_at)
  VALUES (?, ?, ?, ?, ?)
`;
exports.selectPostByIdTemplate = `
  SELECT * FROM posts WHERE id = ?
`;
