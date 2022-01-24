import React, { useState } from "react";
import { createPortal } from "react-dom";
import { DialogConatiner } from "../components/Dialog/DialogConatiner";

interface IuseDialog {
  setDialogOpen: () => void,
  setDialogClose: () => void,
  DialogContainer: React.FC<{ children?: React.ReactNode, label?: string }>,
  isOpen: boolean
}

function useDialog(callback?: () => void): IuseDialog {
  const [isOpen, setOpen] = useState(false);

  const setDialogOpen = () => setOpen(true);
  const setDialogClose = () => setOpen(false);
  const submit = () => {
    if (callback) {
      callback();
    }
    setOpen(false);
  };

  const DialogPortal = ({ children, label }: { children: React.ReactNode, label?: string }) => createPortal(
    <DialogConatiner label={label} children={children} stateHandler={{isOpen, setOpen}} onSubmit={submit} onClose={setDialogClose} />,
    window.document.getElementById("portal") as HTMLElement
  );

  const DialogContainer: React.FC<{ children?: React.ReactNode, label?: string }> = ({ children, label }) => (
    <>
      {isOpen && <DialogPortal label={label} children={children}/>}
    </>
  );

  return {
    setDialogOpen,
    setDialogClose,
    DialogContainer,
    isOpen
  };
}

export default useDialog;