import { useState } from "react";
import { Car, CarEntry, CarResponse } from "../types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import CarDialogContent from "./CarDialogContent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCar } from "../api/carapi";
import EditIcon from "@mui/icons-material/Edit";

type FormProps = {
  cardata: CarResponse;
};

export default function EditCar({ cardata }: FormProps) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(updateCar, {
    onSuccess: () => {
      queryClient.invalidateQueries(["cars"]);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const [open, setOpen] = useState(false);
  const [car, setCar] = useState<Car>({
    brand: "",
    model: "",
    color: "",
    registrationNumber: "",
    modelYear: 0,
    price: 0,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCar({
      ...car,
      [event.target.name]: event.target.value,
    });
  };

  const handleClickOpen = () => {
    setCar({
      brand: cardata.brand,
      model: cardata.model,
      color: cardata.color,
      registrationNumber: cardata.registrationNumber,
      modelYear: cardata.modelYear,
      price: cardata.price,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const url = cardata._links.self.href;
    const carEntry: CarEntry = { car, url };
    mutate(carEntry);
    setCar({
      brand: "",
      model: "",
      color: "",
      registrationNumber: "",
      modelYear: 0,
      price: 0,
    });

    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Edit Car">
        <IconButton aria-label="edit" size="small" onClick={handleClickOpen}>
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Car</DialogTitle>
        <CarDialogContent car={car} handleChange={handleChange} />
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="outlined" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
