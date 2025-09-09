import { Dialog } from "radix-ui";
import Button from "../common/Button";
import { useState } from "react";
import usePost from "../../hooks/usePost";
import useAppContext from "../../hooks/useAppContext";
import SmallLoader from "../common/SmallLoader";
import { cn } from "../../utils/constants";

const AddUserModal = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const {
    state: {
      modalProps: { userId },
    },
  } = useAppContext();
  const { addPost, isAdding } = usePost({
    userId: userId as string,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      addPost({ user_id: userId as string, title, body: content });
      setContent("");
      setTitle("");
    } catch (error: unknown) {
      console.log(error);
    }
  };
  const isDisable = !title || !content;

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
            maxLength={60}
            required
            onChange={(e) => setTitle(e.target.value)}
            className={cn(
              "block w-full text-sm placeholder:text-app-600 focus-visible:ring-none focus-within:ring-border-200 focus-within:!shadow-none  focus-visible:ring-app-secondary rounded-md border border-border-200 py-[10px] px-4 h-[40px]"
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-app-200 font-medium text-lg">Post content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            required
            maxLength={400}
            placeholder="Write something mind-blowing"
            className="block font-normal w-full text-sm placeholder:text-app-600 focus-visible:ring-none focus-within:ring-border-200 focus-within:!shadow-none focus-visible:ring-app-secondary rounded-md border border-border-200 py-[10px] px-4 h-[179px]"
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
            disabled={isDisable}
            rightIcon={isAdding ? <SmallLoader /> : null}
            className="border-border-200 flex items-center justify-center gap-x-2 border-[1px] text-white font-normal text-sm px-4"
          >
            <span>{isAdding ? "Publishing" : "Publish"}</span>
          </Button>
        </div>
      </Dialog.Content>
    </form>
  );
};

export default AddUserModal;
