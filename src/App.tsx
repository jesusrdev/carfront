import {
  AppBar,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";

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
      </Container>
    </ThemeProvider>
  );
}

export default App;
