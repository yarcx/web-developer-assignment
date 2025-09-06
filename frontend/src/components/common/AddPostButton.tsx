import AddCircle from "../../assets/icons/AddCircle";
import Button from "./Button";

const AddPostButton = ({ handleOpenAddUserModal }: { handleOpenAddUserModal: () => void }) => {
  return (
    <div
      onClick={() => handleOpenAddUserModal()}
      className="h-[290px] w-[273px] cursor-pointer flex flex-col items-center justify-center rounded-md border-dashed border-[2px] border-border-100 das"
    >
      <AddCircle />
      <Button variant="ghost" className="text-app-500 font-medium">
        New Post
      </Button>
    </div>
  );
};

export default AddPostButton;
