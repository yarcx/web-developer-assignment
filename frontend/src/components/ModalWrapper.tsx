import { Dialog } from "radix-ui";
import useAppContext from "../hooks/useAppContext";
import AddUserModal from "./modals/AddUserModal";
import { STATE_ACTIONS } from "../utils/constants";

const SelectedModal = {
  [STATE_ACTIONS.ADD_NEW_USER]: <AddUserModal />,
};

const ModalWrapper = () => {
  const {
    state: { isModalOpen, modalType },
    closeModal,
  } = useAppContext();

  const SelectedActiveModal = SelectedModal[modalType];

  return (
    <Dialog.Root open={isModalOpen} onOpenChange={closeModal}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-overlayShow" />
        {SelectedActiveModal}
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ModalWrapper;
