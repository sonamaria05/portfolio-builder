import React, { useState, createContext, useMemo } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import BuilderPage from "./pages/BuilderPage";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

// ✅ Reusable Navbar component
function Navbar({ mode, toggleColorMode }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <AppBar position="static" color="primary" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer", fontWeight: 600 }}
          onClick={() => navigate("/")}
        >
          Portfolio Builder
        </Typography>

        <IconButton color="inherit" onClick={toggleColorMode} sx={{ mr: 1 }}>
          {mode === "light" ? <DarkMode /> : <LightMode />}
        </IconButton>

        {token ? (
          <>
            <Button color="inherit" onClick={() => navigate("/builder")}>
              Builder
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button color="inherit" onClick={() => navigate("/signup")}>
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

// ✅ Reusable Footer component
function Footer() {
  return (
    <Box sx={{ textAlign: "center", py: 2, bgcolor: "background.paper", mt: 4 }}>
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} Portfolio Builder | Designed with ❤️ using React + MUI
      </Typography>
    </Box>
  );
}

function AppContent({ mode, toggleColorMode }) {
  return (
    <>
      <Navbar mode={mode} toggleColorMode={toggleColorMode} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/builder" element={<BuilderPage />} />
      </Routes>
      <Footer />
    </>
  );
}

// ✅ Main App
function App() {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: mode === "light" ? "#1976d2" : "#90caf9" },
          secondary: { main: "#f50057" },
          background: {
            default: mode === "light" ? "#f9fafc" : "#121212",
            paper: mode === "light" ? "#fff" : "#1e1e1e",
          },
        },
        typography: {
          fontFamily: "'Poppins', sans-serif",
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <AppContent
            mode={mode}
            toggleColorMode={colorMode.toggleColorMode}
          />
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
