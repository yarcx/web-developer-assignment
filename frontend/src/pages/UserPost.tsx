import { useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "../components/common/Button";
import LeftArrowIcon from "../assets/icons/LeftArrow";
import AddCircle from "../assets/icons/AddCircle";
import PostCard from "../components/common/PostCard";
import { STATE_ACTIONS } from "../utils/constants";
import AppLoader from "../components/AppLoader";
import useAppContext from "../hooks/useAppContext";
import usePost from "../hooks/usePost";
import ErrorFallback from "../components/ErrorFallback";
import type { User } from "../utils/types";

const UserPost = () => {
  const navigate = useNavigate();
  const { openModal } = useAppContext();
  const { postId } = useParams();
  const { state } = useLocation();
  const user: User = state || {};
  const {
    singlePostData,
    singlePostError,
    isLoadingSinglePost,
    handleDeletePost,
    deletingPostLoading,
  } = usePost({
    userId: postId!,
  });
  const isLoading = isLoadingSinglePost || deletingPostLoading;

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

          <h3 className="font-medium text-app-100 text-4xl">{user?.name}</h3>

          <p className="text-app-200 font-normal text-sm">
            {user?.email} • <span className="font-medium">{singlePostData?.length} Posts</span>{" "}
          </p>
        </header>

        <main className="grid grid-cols-3 gap-6">
          <div
            onClick={() =>
              openModal(STATE_ACTIONS.ADD_NEW_USER, {
                userId: postId,
              })
            }
            className="h-[290px] w-[273px] cursor-pointer flex flex-col items-center justify-center rounded-md border-dashed border border-border-100 das"
          >
            <AddCircle />
            <Button variant="ghost" className="text-app-500 font-medium">
              New Post
            </Button>
          </div>
          {singlePostData?.map((post, index) => (
            <PostCard
              key={post?.id + index}
              post={post}
              handleDeletePost={(id: string) => handleDeletePost(id)}
            />
          ))}
        </main>
      </section>
    </>
  );
};

export default UserPost;
