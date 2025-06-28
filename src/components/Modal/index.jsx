import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Button from "../Button";
import ModalTask from "../ModalTask";
import "./Modal.scss";

const Modal = ({ open, onClose, task = null, storage, ...props }) => {
  const dialog = useRef();

  const HendlerCloseModal = (event) => {
    event.preventDefault();
    onClose();
  };

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className="modal" {...props}>
      <div className="modal__body">
        <ModalTask
          onClose={onClose}
          role={open}
          task={task}
          storage={storage}
        />
      </div>
      <Button className="modal__close" onClick={HendlerCloseModal}>
        ×
      </Button>
    </dialog>,
    document.querySelector("#modal")
  );
};

export default Modal;
