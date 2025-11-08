import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#8b6f47",
      light: "#d4a574",
    },
    secondary: {
      main: "#ffffff",
    },
    background: {
      default: "linear-gradient(135deg, #f5e6d3 0%, #d4a574 50%, #8b6f47 100%)",
    },
  },
  typography: {
    h2: {
      fontWeight: 800,
      background: "linear-gradient(to right, #ffffff, #fff8f0)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      textShadow: "0 4px 12px rgba(0,0,0,0.15)",
    },
    subtitle1: {
      fontWeight: 700,
      background: "linear-gradient(135deg, #8b6f47 0%, #d4a574 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 700,
          transition: "all 0.3s ease",
        },
      },
      variants: [
        {
          props: { variant: "contained", size: "large" },
          style: {
            py: 1.75,
            fontSize: "1.05rem",
            background: "linear-gradient(135deg, #d4a574 0%, #8b6f47 100%)",
            boxShadow: "0 8px 20px rgba(139, 111, 71, 0.35)",
            "&:hover": {
              background: "linear-gradient(135deg, #c19560 0%, #6f5638 100%)",
              boxShadow: "0 12px 28px rgba(139, 111, 71, 0.45)",
              transform: "translateY(-2px)",
            },
            "&:disabled": {
              background: "linear-gradient(135deg, #e0e0e0 0%, #d0d0d0 100%)",
              boxShadow: "none",
            },
          },
        },
        {
          props: { variant: "outlined" },
          style: {
            borderStyle: "dashed",
            borderWidth: 2,
            borderColor: "#d4a574",
            borderRadius: 12,
            background: "linear-gradient(135deg, rgba(212, 165, 116, 0.05) 0%, rgba(139, 111, 71, 0.05) 100%)",
            "&:hover": {
              borderColor: "#8b6f47",
              background: "linear-gradient(135deg, rgba(212, 165, 116, 0.1) 0%, rgba(139, 111, 71, 0.1) 100%)",
            },
          },
        },
      ],
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.5)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          overflow: "hidden",
          transition: "all 0.3s ease",
          cursor: "pointer",
          "&:hover": {
            transform: "translateY(-6px) scale(1.03)",
            boxShadow: "0 12px 28px rgba(139, 111, 71, 0.25)",
          },
        },
      },
    },
  },
});

export default theme;
