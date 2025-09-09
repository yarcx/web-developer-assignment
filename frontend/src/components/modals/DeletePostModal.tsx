import { Dialog } from "radix-ui";
import Button from "../common/Button";
import useAppContext from "../../hooks/useAppContext";
import SmallLoader from "../common/SmallLoader";
import usePost from "../../hooks/usePost";

const DeletePostModal = () => {
  const {
    state: {
      modalProps: { userId, postIdToDelete },
    },
    closeModal,
  } = useAppContext();
  const { handleDeletePost, deletingPostLoading } = usePost({ userId: userId as string });

  return (
    <Dialog.Content className="fixed bg-white left-1/2 top-1/2 flex flex-col gap-6 max-h-[483px] w-[90vw] max-w-[679px] -translate-x-1/2 -translate-y-1/2 rounded-lg p-[24px] shadow focus:outline-none data-[state=open]:animate-contentShow">
      <Dialog.Title className="m-0 text-4xl text-app-100 font-medium">Delete Post</Dialog.Title>
      <Dialog.Content>
        <p>Are you sure you want to delete this post?</p>
      </Dialog.Content>
      <div className="flex gap-2 justify-end">
        <Dialog.Close asChild>
          <Button
            onClick={closeModal}
            className="border-border-200 border-[1px] bg-transparent text-app-400 font-normal text-sm px-4"
          >
            Cancel
          </Button>
        </Dialog.Close>
        <Button
          type="submit"
          disabled={deletingPostLoading}
          rightIcon={deletingPostLoading ? <SmallLoader /> : null}
          onClick={() => handleDeletePost(postIdToDelete as string)}
          className="border-border-200 flex items-center justify-center gap-x-2 border-[1px] text-white font-normal text-sm px-4"
        >
          <span>{deletingPostLoading ? "Deleting..." : "Delete"}</span>
        </Button>
      </div>
    </Dialog.Content>
  );
};

export default DeletePostModal;
