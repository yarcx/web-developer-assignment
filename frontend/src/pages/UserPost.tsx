import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import Button from "../components/common/Button";
import LeftArrowIcon from "../assets/icons/LeftArrow";
import PostCard from "../components/common/PostCard";
import { STATE_ACTIONS } from "../utils/constants";
import AppLoader from "../components/AppLoader";
import useAppContext from "../hooks/useAppContext";
import usePost from "../hooks/usePost";
import ErrorFallback from "../components/ErrorFallback";
import AddPostButton from "../components/common/AddPostButton";

const UserPost = () => {
  const navigate = useNavigate();
  const { openModal } = useAppContext();
  const { postId } = useParams();;

  const { singlePostData, singlePostError, isLoadingSinglePost, deletingPostLoading } = usePost({
    userId: postId!,
  });
  const isLoading = isLoadingSinglePost || deletingPostLoading;
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const email = searchParams.get("email");

  const handleOpenModal = (modalType: string, postIdToDelete?: string) => {
    openModal(modalType, {
      userId: postId,
      postIdToDelete,
    });
  };

  if (singlePostError?.message) return <ErrorFallback />;
  if (isLoading) return <AppLoader />;

  return (
    <>
      <section className="flex flex-col gap-6">
        <header className="flex flex-col gap-3 items-start">
          <Button
            leftIcon={<LeftArrowIcon />}
            variant="ghost"
            onClick={() => navigate(-1)}
            className="font-medium text-app-200 pl-0 text-sm"
          >
            <span>Back to Users</span>
          </Button>

          <h3 className="font-medium text-app-100 text-4xl">{name}</h3>

          <p className="text-app-200 font-normal text-sm">
            {email} • <span className="font-medium">{singlePostData?.length} Posts</span>{" "}
          </p>
        </header>

        <main className="grid sm:grid-cols-2 grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AddPostButton
            handleOpenAddUserModal={() => handleOpenModal(STATE_ACTIONS.ADD_NEW_USER)}
          />
          {singlePostData?.map((post, index) => (
            <PostCard
              key={post?.id + index}
              post={post}
              handleDeletePost={() => handleOpenModal(STATE_ACTIONS.DELETE_POST, `${post?.id}`)}
            />
          ))}
        </main>
      </section>
    </>
  );
};

export default UserPost;
