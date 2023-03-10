import * as React from "react";
import Box, { BoxProps } from "@mui/material/Box";
import Modal from "@mui/base/ModalUnstyled";
import { XIcon } from "@heroicons/react/solid";

interface ModalProps {
  content: any;
  showModal: boolean;
  setShowModal: any;
  showBtn?: boolean;
  showBtnText?: string;
  boxProps?: BoxProps;
}

const style = {
  transform: "translate(-50%, -50%)",
  width: 400,
};

const Backdrop = (props) => (
  <div {...props} className="fixed right-0 bottom-0 top-0 left-0 bg-black opacity-50 -z-50"></div>
);

const ModalComp = ({
  content,
  showModal,
  setShowModal,
  showBtn = true,
  showBtnText = "Toggle modal",
  boxProps,
}: ModalProps) => {
  const [open, setOpen] = React.useState(showModal);
  const handleClose = (e: Event, reason: string) => {
    if (["escapeKeyDown", "backdropClick"].indexOf(reason) === -1) {
      setOpen(false);
    }
  };

  const onModalClose = (e: any) => {
    setOpen(false);
    setShowModal(false);
  };

  React.useEffect(() => {
    setOpen(showModal);
  }, [showModal]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      classes={{
        root: "fixed z-50 top-0 bottom-0 flex m-0 p-0 w-full h-full",
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      slots={{ backdrop: Backdrop }}
    >
      <Box
        sx={style}
        className="flex flex-col items-center absolute top-1/2 left-1/2 bg-white rounded-md shadow-2xl shadow-black p-1"
        {...boxProps}
      >
        <div className="flex flex-row justify-end w-full h-4">
          <button onClick={onModalClose}>
            <XIcon width={25} className="m-0" />
          </button>
        </div>
        {content}
      </Box>
    </Modal>
  );
};

export default ModalComp;
