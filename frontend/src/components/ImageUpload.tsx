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

interface ImageUploadProps {
    preview: string | null;
    onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  
  const ImageUpload: React.FC<ImageUploadProps> = ({ preview, onImageUpload }) => (
    <Box mb={3}>
      <SectionTitle>Upload Room Image</SectionTitle>
      <Button
        variant="outlined"
        component="label"
        fullWidth
        sx={{
          height: preview ? "auto" : 220,
          borderStyle: "dashed",
          borderWidth: 2,
          borderColor: "#d4a574",
          borderRadius: 3,
          background: "linear-gradient(135deg, rgba(212, 165, 116, 0.05) 0%, rgba(139, 111, 71, 0.05) 100%)",
          transition: "all 0.3s ease",
          "&:hover": {
            borderColor: "#8b6f47",
            background: "linear-gradient(135deg, rgba(212, 165, 116, 0.1) 0%, rgba(139, 111, 71, 0.1) 100%)",
            transform: "translateY(-2px)",
            boxShadow: "0 8px 20px rgba(139, 111, 71, 0.15)",
          },
        }}
      >
        {preview ? (
          <Box sx={{ width: "100%", py: 2 }}>
            <img
              src={preview}
              alt="Preview"
              style={{
                width: "100%",
                maxHeight: "400px",
                objectFit: "contain",
                borderRadius: 12,
              }}
            />
          </Box>
        ) : (
          <Box textAlign="center">
            <Upload sx={{ fontSize: 48, color: "#d4a574", mb: 2 }} />
            <Typography variant="body1" color="#8b6f47" fontWeight="600">
              Click to upload or drag and drop
            </Typography>
            <Typography variant="caption" color="text.secondary" mt={1} display="block">
              JPEG up to 10MB
            </Typography>
          </Box>
        )}
        <input
          type="file"
          accept="image/jpeg, image/jpg"
          hidden
          onChange={onImageUpload}
        />
      </Button>
    </Box>
  );

export default ImageUpload;