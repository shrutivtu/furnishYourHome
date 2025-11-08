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

// Budget Input Component
interface BudgetInputProps {
    value: string;
    onChange: (value: string) => void;
  }
  
  const BudgetInput: React.FC<BudgetInputProps> = ({ value, onChange }) => (
    <Box mb={3}>
      <SectionTitle>Maximum Budget</SectionTitle>
      <TextField
        placeholder="Enter your budget"
        type="number"
        fullWidth
        value={value}
        onChange={(e) => onChange(e.target.value)}
        variant="outlined"
        InputProps={{
          startAdornment: (
            <Typography sx={{ mr: 1, color: "#8b6f47", fontWeight: "700" }}>
              $
            </Typography>
          ),
        }}
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

  export default BudgetInput;