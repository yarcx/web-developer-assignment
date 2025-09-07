export const ENDPOINTS = {
  USERS: (pageNumber: string, pageSize: string) =>
    `/users?pageNumber=${pageNumber}&pageSize=${pageSize}`,
  USERS_COUNT: "/users/count",
  SINGLE_POSTS: (userId: string) => `/posts?userId=${userId}`,
  DELETE_SINGLE_POSTS: (postId: string) => `/posts/${postId}`,
  POSTS: "/posts",
};
