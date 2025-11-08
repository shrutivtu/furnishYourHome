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
const Header: React.FC = () => (
    <Fade in timeout={800}>
      <Box textAlign="center" mb={6}>
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 2,
            mb: 2,
          }}
        >
          <HomeIcon sx={{ fontSize: 48, color: "white", filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.2))" }} />
          <Typography
            variant="h2"
            fontWeight="800"
            sx={{
              background: "linear-gradient(to right, #ffffff, #fff8f0)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            AI Room Redesigner
          </Typography>
        </Box>
        <Typography
          variant="h6"
          sx={{
            color: "rgba(255,255,255,0.95)",
            fontWeight: 400,
            textShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          Transform your space with AI-powered design magic ✨
        </Typography>
        <Box sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
          <Chip
            icon={<AutoAwesome sx={{ fontSize: 16 }} />}
            label="Instant Redesign"
            sx={{
              bgcolor: "rgba(255,255,255,0.25)",
              color: "white",
              backdropFilter: "blur(10px)",
              fontWeight: 600,
              border: "1px solid rgba(255,255,255,0.3)",
            }}
          />
          <Chip
            icon={<Upload sx={{ fontSize: 16 }} />}
            label="Budget Friendly"
            sx={{
              bgcolor: "rgba(255,255,255,0.25)",
              color: "white",
              backdropFilter: "blur(10px)",
              fontWeight: 600,
              border: "1px solid rgba(255,255,255,0.3)",
            }}
          />
        </Box>
      </Box>
    </Fade>
  );

  export default Header;