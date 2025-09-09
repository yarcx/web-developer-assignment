import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addSinglePost, deleteSinglePost, getSinglePost } from "../services/post-requests";
import { MUTATION_KEYS, QUERY_KEYS } from "../utils/constants";
import useAppContext from "./useAppContext";

const usePost = ({ userId }: { userId?: string }) => {
  const queryClient = useQueryClient();
  const { closeModal } = useAppContext();
  const {
    data: singlePostData,
    error: singlePostError,
    isLoading: isLoadingSinglePost,
  } = useQuery({
    queryKey: [userId, QUERY_KEYS.GET_SINGLE_POST],
    queryFn: () => getSinglePost({ userId: userId! }),
    enabled: !!userId,
  });

  const { mutate: handleDeletePost, isPending: deletingPostLoading } = useMutation({
    mutationKey: [MUTATION_KEYS.DELETE_SINGLE_POST],
    mutationFn: (postId: string) => deleteSinglePost({ postId: postId! }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [userId, QUERY_KEYS.GET_SINGLE_POST] });
      closeModal();
    },
  });

  const { mutate: addPost, isPending: isAdding } = useMutation({
    mutationFn: addSinglePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [userId, QUERY_KEYS.GET_SINGLE_POST] });
      closeModal();
    },
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
