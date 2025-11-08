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
import ImageUpload from "./ImageUpload";
import VisionInput from "./VisionInput";
import BudgetInput from "./BudgetInput";
import ActionButton from "./ActionButton";
// Initial Form Component
interface InitialFormProps {
    preview: string | null;
    prompt: string;
    budget: string;
    loading: boolean;
    error: string | null;
    onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onPromptChange: (value: string) => void;
    onBudgetChange: (value: string) => void;
    onSubmit: () => void;
  }
  
  const InitialForm: React.FC<InitialFormProps> = ({
    preview,
    prompt,
    budget,
    loading,
    error,
    onImageUpload,
    onPromptChange,
    onBudgetChange,
    onSubmit,
  }) => (
    <>
      <ImageUpload preview={preview} onImageUpload={onImageUpload} />
      <VisionInput value={prompt} onChange={onPromptChange} />
      <BudgetInput value={budget} onChange={onBudgetChange} />
      
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
        onClick={onSubmit}
        loading={loading}
        icon={<AutoAwesome />}
        loadingText="Redesigning your room..."
        buttonText="Redesign My Room"
      />
    </>
  );

export default InitialForm;