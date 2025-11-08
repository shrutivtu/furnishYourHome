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

// Vision Input Component
interface VisionInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    label?: string;
  }
  
  const VisionInput: React.FC<VisionInputProps> = ({ 
    value, 
    onChange, 
    placeholder = "e.g., Modern minimalist living room with warm tones and natural light",
    label = "Describe Your Vision"
  }) => (
    <Box mb={3}>
      <SectionTitle>{label}</SectionTitle>
      <TextField
        placeholder={placeholder}
        fullWidth
        multiline
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        variant="outlined"
        sx={{
          "& .MuiOutlinedInput-root": {
            background: "linear-gradient(135deg, rgba(212, 165, 116, 0.05) 0%, rgba(139, 111, 71, 0.05) 100%)",
            borderRadius: 2,
            transition: "all 0.3s ease",
            "&:hover": {
              background: "linear-gradient(135deg, rgba(212, 165, 116, 0.08) 0%, rgba(139, 111, 71, 0.08) 100%)",
            },
            "&.Mui-focused": {
              background: "white",
              boxShadow: "0 0 0 3px rgba(212, 165, 116, 0.15)",
            },
          },
        }}
      />
    </Box>
  );

export default VisionInput;