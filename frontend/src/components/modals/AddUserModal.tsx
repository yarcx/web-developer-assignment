import { Dialog } from "radix-ui";
import Button from "../common/Button";
import { useState } from "react";
import usePost from "../../hooks/usePost";
import useAppContext from "../../hooks/useAppContext";
import Loader from "../common/Loader";

const AddUserModal = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const {
    state: {
      modalProps: { postId },
    },
  } = useAppContext();
  const { addPost, isAdding } = usePost({
    userId: postId as string,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
       addPost({ userId: postId as string, title, body: content });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Dialog.Content className="fixed bg-white left-1/2 top-1/2 flex flex-col gap-6 max-h-[483px] w-[90vw] max-w-[679px] -translate-x-1/2 -translate-y-1/2 rounded-lg p-[24px] shadow focus:outline-none data-[state=open]:animate-contentShow">
        <Dialog.Title className="m-0 text-4xl text-app-100 font-medium">New Post</Dialog.Title>
        <div className="flex flex-col gap-2">
          <label className="text-app-200 font-medium text-lg">Post title</label>
          <input
            type="text"
            placeholder="Give your post a title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full text-sm text-app-600 focus-visible:ring-none focus-within:ring-border-200 focus-within:!shadow-none  focus-visible:ring-app-secondary rounded-md border border-border-200 py-[10px] px-4 h-[40px]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-app-200 font-medium text-lg">Post content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            placeholder="Write something mind-blowing"
            className="block font-normal w-full text-sm text-app-600 focus-visible:ring-none focus-within:ring-border-200 focus-within:!shadow-none focus-visible:ring-app-secondary rounded-md border border-border-200 py-[10px] px-4 h-[179px]"
          />
        </div>
        <div className="flex gap-2 justify-end">
          <Dialog.Close asChild>
            <Button className="border-border-200 border-[1px] bg-transparent text-app-400 font-normal text-sm px-4">
              Cancel
            </Button>
          </Dialog.Close>
          <Button
            type="submit"
            className="border-border-200 border-[1px] text-white font-normal text-sm px-4"
          >
            {isAdding ? "Publishing" : "Publish"} {isAdding ? <Loader /> : null}
          </Button>
        </div>
      </Dialog.Content>
    </form>
  );
};

export default AddUserModal;
