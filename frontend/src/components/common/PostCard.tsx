import DeleteBin from "../../assets/icons/DeleteBin";
import type { Post } from "../../utils/types";
import Button from "./Button";

const PostCard = ({
  post: { body, title },
  handleDeletePost,
}: {
  post: Post;
  handleDeletePost: () => void;
}) => {
  return (
    <div className="h-[293px] shadow-xs w-[270px] overflow-hidden p-6 flex relative flex-col gap-4 border rounded-md  border-app-300">
      <div className="h-full overflow-hidden flex flex-col gap-4">
        <Button
          onClick={handleDeletePost}
          variant="ghost"
          className="absolute top-0 -right-1"
        >
          <DeleteBin />
        </Button>
        <h4 className="font-medium text-lg text-app-200 w-[201px]">{title}</h4>
        <div className="overflowText">
          <p className="text-app-200 font-normal text-sm">{body}</p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
