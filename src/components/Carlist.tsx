import { deleteCar, getCars } from "../api/carapi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DataGrid,
  GridColDef,
  GridCellParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { useState } from "react";
import { IconButton, Snackbar, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCar from "./AddCar";
import EditCar from "./EditCar";

export default function Carlist() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data, error, isSuccess } = useQuery({
    queryKey: ["cars"],
    queryFn: getCars,
  });

  const { mutate } = useMutation({
    mutationFn: deleteCar,
    onSuccess: () => {
      setOpen(true);
      // To refetch the cars, we need to invalidate the query
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const columns: GridColDef[] = [
    { field: "brand", headerName: "Brand", width: 200 },
    { field: "model", headerName: "Model", width: 200 },
    { field: "color", headerName: "Color", width: 200 },
    { field: "registrationNumber", headerName: "Reg.nr.", width: 250 },
    { field: "modelYear", headerName: "Model Year", width: 150 },
    { field: "price", headerName: "Price", width: 150 },
    {
      field: "edit",
      headerName: "",
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: false,
      renderCell: (params: GridCellParams) => <EditCar cardata={params.row} />,
    },
    {
      field: "delete",
      headerName: "",
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: false,
      renderCell: (params: GridCellParams) => {
        return (
          <Tooltip title="Delete Car">
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => {
                if (
                  window.confirm(
                    `Are you sure you want to delete ${params.row.brand} ${params.row.model}?`
                  )
                ) {
                  mutate(params.row._links.self.href);
                }
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        );
      },
    },
  ];

  if (!isSuccess) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error when fetching cars...</div>;
  } else {
    return (
      <>
        <AddCar />
        <DataGrid
          rows={data}
          columns={columns}
          disableRowSelectionOnClick={true}
          getRowId={(row) => row._links.self.href}
          slots={{ toolbar: GridToolbar }}
        />
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          message="Car deleted"
        />
      </>
    );
  }

  return <div></div>;
}
