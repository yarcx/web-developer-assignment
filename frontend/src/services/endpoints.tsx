export const ENDPOINTS = {
  USERS: (pageNumber: string, pageSize: string) =>
    `http://localhost:3001/users?pageNumber=${pageNumber}&pageSize=${pageSize}`,
  USERS_COUNT: "http://localhost:3001/users/count",
  SINGLE_POSTS: (userId: string) => `http://localhost:3001/posts?userId=${userId}`,
    DELETE_SINGLE_POSTS: (postId: string) => `http://localhost:3001/posts/${postId}`,
  POSTS: "http://localhost:3001/posts",
  COMMENTS: "http://localhost:3001/comments",
};
