import { Button, Snackbar, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import Carlist from "./Carlist";

type user = {
  username: string;
  password: string;
};

export default function Login() {
  const [user, setUser] = useState<user>({
    username: "",
    password: "",
  });
  const [isAuthenticated, setAuth] = useState(false);

  const [open, setOpen] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = () => {
    axios
      .post(import.meta.env.VITE_API_URL + "/login", user, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const jwtToken = res.headers.authorization;
        if (jwtToken !== null) {
          sessionStorage.setItem("jwt", jwtToken);
          setAuth(true);
        }
      })
      .catch(() => {
        setOpen(true);
      });
  };

  if (isAuthenticated) {
    return <Carlist />;
  }

  return (
    <Stack spacing={2} alignItems={"center"} mt={5}>
      <TextField
        name="username"
        label="Username"
        variant="outlined"
        value={user.username}
        onChange={handleChange}
      />
      <TextField
        name="password"
        type="password"
        label="Password"
        variant="outlined"
        value={user.password}
        onChange={handleChange}
      />
      <Button variant="outlined" color="primary" onClick={handleLogin}>
        Login
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message="Login failed: Check your username and password"
      />
    </Stack>
  );
}
