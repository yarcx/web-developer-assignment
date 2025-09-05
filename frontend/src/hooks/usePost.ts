import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addSinglePost, deleteSinglePost, getSinglePost } from "../services/post-requests";
import { MUTATION_KEYS, QUERY_KEYS } from "../utils/constants";

const usePost = ({ userId }: { userId: string }) => {
    const queryClient = useQueryClient()
  const {
    data: singlePostData,
    error: singlePostError,
    isLoading: isLoadingSinglePost,
  } = useQuery({
    queryKey: [userId, QUERY_KEYS.GET_SINGLE_POST],
    queryFn: () => getSinglePost({ userId }),
    enabled: !!userId,
  });

  const { mutate: handleDeletePost, isPending: deletingPostLoading } = useMutation({
    mutationKey: [MUTATION_KEYS.DELETE_SINGLE_POST],
    mutationFn: (postId: string) => deleteSinglePost({ postId: postId! }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [userId, QUERY_KEYS.GET_SINGLE_POST] });
    },
  });
  const { mutate: addPost, isPending: isAdding } = useMutation({
    mutationFn: addSinglePost,
  });

  return {
    singlePostData,
    singlePostError,
    isLoadingSinglePost,
    handleDeletePost,
    deletingPostLoading,
    addPost,
    isAdding,
  };
};

export default usePost;
