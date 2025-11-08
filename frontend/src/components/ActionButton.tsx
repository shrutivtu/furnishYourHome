import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  CircularProgress,
  Alert,
  Container,
  Card,
  CardMedia,
  Paper,
  Fade,
  Chip,
} from "@mui/material";
import { Edit, Upload, AutoAwesome, Home as HomeIcon } from "@mui/icons-material";
import SectionTitle from "./SectionTitle";

// Action Button Component
interface ActionButtonProps {
    onClick: () => void;
    loading: boolean;
    icon?: React.ReactNode;
    loadingText: string;
    buttonText: string;
  }
  
  const ActionButton: React.FC<ActionButtonProps> = ({ 
    onClick, 
    loading, 
    icon, 
    loadingText, 
    buttonText 
  }) => (
    <Button
      variant="contained"
      size="large"
      fullWidth
      onClick={onClick}
      disabled={loading}
      startIcon={!loading && icon}
      sx={{
        py: 1.75,
        fontSize: "1.05rem",
        fontWeight: "700",
        textTransform: "none",
        background: "linear-gradient(135deg, #d4a574 0%, #8b6f47 100%)",
        borderRadius: 2,
        boxShadow: "0 8px 20px rgba(139, 111, 71, 0.35)",
        transition: "all 0.3s ease",
        "&:hover": {
          background: "linear-gradient(135deg, #c19560 0%, #6f5638 100%)",
          boxShadow: "0 12px 28px rgba(139, 111, 71, 0.45)",
          transform: "translateY(-2px)",
        },
        "&:disabled": {
          background: "linear-gradient(135deg, #e0e0e0 0%, #d0d0d0 100%)",
          boxShadow: "none",
        },
      }}
    >
      {loading ? (
        <Box display="flex" alignItems="center" gap={1.5}>
          <CircularProgress size={22} color="inherit" />
          <span>{loadingText}</span>
        </Box>
      ) : (
        buttonText
      )}
    </Button>
  );

  export default ActionButton