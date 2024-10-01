import {
  AppBar,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const darkTheme = createTheme({
  // palette: {
  //   mode: "dark",
  //   primary: {
  //     main: '#ff5252',
  //   },
  // },
  colorSchemes: {
    dark: true,
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Container maxWidth="xl">
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Car Shop</Typography>
          </Toolbar>
        </AppBar>
        <QueryClientProvider client={queryClient}></QueryClientProvider>
      </Container>
    </ThemeProvider>
  );
}

export default App;
