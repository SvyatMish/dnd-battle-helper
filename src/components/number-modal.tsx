import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { useCallback } from "react";

import { Input } from "./ui/fields.tsx";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type FormValues = {
  number?: number;
};

export const NumberModal: React.FC<{
  buttonText: string;
  onSubmit(v: number): void;
  onClose: () => void;
  isOpen: boolean;
}> = ({ buttonText, onSubmit, onClose, isOpen }) => {
  const { handleSubmit, control, reset } = useForm<FormValues>({});

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, []);

  const submitFn = useCallback((v: FormValues) => {
    onSubmit(v.number || 0);
    handleClose();
  }, []);

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(submitFn)}>
            <Input
              type="number"
              name="number"
              control={control}
              label="Число"
              autoFocus={true}
            />
            <Button type="submit">{buttonText}</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
