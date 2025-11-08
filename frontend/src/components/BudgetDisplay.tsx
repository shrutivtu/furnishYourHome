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

// Budget Display Component
interface BudgetDisplayProps {
    budget: string;
  }
  
  const BudgetDisplay: React.FC<BudgetDisplayProps> = ({ budget }) => (
    <Box mb={3}>
      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderRadius: 2,
          background: "linear-gradient(135deg, rgba(212, 165, 116, 0.12) 0%, rgba(139, 111, 71, 0.12) 100%)",
          border: "1px solid rgba(212, 165, 116, 0.3)",
        }}
      >
        <Typography variant="body2" color="text.secondary" fontWeight="600">
          Budget
        </Typography>
        <Typography variant="h5" fontWeight="800" sx={{ color: "#8b6f47" }}>
          ${budget}
        </Typography>
      </Paper>
    </Box>
  );

export default BudgetDisplay;