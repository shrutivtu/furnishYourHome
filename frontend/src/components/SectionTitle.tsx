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
interface SectionTitleProps {
    children: React.ReactNode;
    mb?: number;
  }
  
  const SectionTitle: React.FC<SectionTitleProps> = ({ children, mb = 1.5 }) => (
    <Typography
      variant="subtitle1"
      fontWeight="700"
      mb={mb}
      sx={{
        background: "linear-gradient(135deg, #8b6f47 0%, #d4a574 100%)",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {children}
    </Typography>
  );

export default SectionTitle;