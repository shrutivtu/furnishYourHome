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
import ActionButton from "./ActionButton";
import BudgetDisplay from "./BudgetDisplay";
import VisionInput from "./VisionInput";

// Edit Form Component
interface EditFormProps {
    editPrompt: string;
    budget: string;
    loading: boolean;
    error: string | null;
    onEditPromptChange: (value: string) => void;
    onEditSubmit: () => void;
    onStartNew: () => void;
  }
  
  const EditForm: React.FC<EditFormProps> = ({
    editPrompt,
    budget,
    loading,
    error,
    onEditPromptChange,
    onEditSubmit,
    onStartNew,
  }) => (
    <Box>
      <Typography
        variant="h6"
        fontWeight="800"
        mb={3}
        sx={{
          background: "linear-gradient(135deg, #8b6f47 0%, #d4a574 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Refine Your Design
      </Typography>
  
      <VisionInput
        value={editPrompt}
        onChange={onEditPromptChange}
        placeholder="e.g., Make it brighter, add more plants, change sofa color to blue"
        label="Request Changes"
      />
  
      <BudgetDisplay budget={budget} />
  
      {error && (
        <Alert
          severity="error"
          sx={{
            mb: 3,
            borderRadius: 2,
            border: "1px solid rgba(211, 47, 47, 0.3)",
          }}
        >
          {error}
        </Alert>
      )}
  
      <ActionButton
        onClick={onEditSubmit}
        loading={loading}
        icon={<Edit />}
        loadingText="Updating design..."
        buttonText="Update Design"
      />
  
      <Button
        variant="text"
        fullWidth
        onClick={onStartNew}
        sx={{
          mt: 2,
          py: 1.25,
          color: "#8b6f47",
          textTransform: "none",
          fontWeight: "600",
          borderRadius: 2,
          transition: "all 0.3s ease",
          "&:hover": {
            background: "rgba(212, 165, 116, 0.12)",
          },
        }}
      >
        Start New Design
      </Button>
    </Box>
  );

export default EditForm