import { useState } from "react";

export default function useModal(defaultValue = "") {
  const [open, setOpen] = useState(defaultValue);

  return {
    open,
    setOpen,
  };
}
