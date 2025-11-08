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

// Results Display Component
interface ResultsDisplayProps {
    resultImage: string;
    furnitureImages: string[];
    totalPrice: number | null;
  }

  const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ resultImage, furnitureImages, totalPrice }) => {
    console.log(resultImage);
    console.log(furnitureImages);
    return(
    <Fade in timeout={1200}>
      <Box
        sx={{
          animation: "slideInRight 0.6s ease-in-out",
          "@keyframes slideInRight": {
            from: {
              opacity: 0,
              transform: "translateX(100px)",
            },
            to: {
              opacity: 1,
              transform: "translateX(0)",
            },
          },
        }}
      >
        {/* Redesigned Image */}
        <Paper
          elevation={24}
          sx={{
            p: 4,
            borderRadius: 4,
            background: "rgba(255, 255, 255, 0.98)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.5)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            mb: 4,
          }}
        >
          <Box display="flex" alignItems="center" gap={1.5} mb={2}>
            <AutoAwesome sx={{ color: "#d4a574", fontSize: 28 }} />
            <Typography
              variant="h5"
              fontWeight="800"
              sx={{
                background: "linear-gradient(135deg, #8b6f47 0%, #d4a574 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Your Redesigned Room
            </Typography>
          </Box>
          <Box
            mt={2}
            sx={{
              position: "relative",
              overflow: "hidden",
              borderRadius: 3,
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              "&:hover img": {
                transform: "scale(1.02)",
              },
            }}
          >
            <img
              src={resultImage}
              alt="Redesigned Room"
              style={{
                width: "100%",
                display: "block",
                borderRadius: 12,
                transition: "transform 0.4s ease",
              }}
            />
          </Box>
        </Paper>

        {/* Total Price */}
      {totalPrice !== null && (
        <Paper elevation={3} sx={{ p: 2, borderRadius: 2, mb: 4, textAlign: "center" }}>
          <Typography variant="subtitle1" fontWeight={700}>Total Price</Typography>
          <Typography variant="h5" fontWeight={800} color="primary">
            ${totalPrice.toFixed(2)}
          </Typography>
        </Paper>
      )}

        {/* Furniture Items */}
        {furnitureImages.length > 0 && (
          <Paper
            elevation={24}
            sx={{
              p: 4,
              borderRadius: 4,
              background: "rgba(255, 255, 255, 0.98)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.5)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            }}
          >
            <Typography
              variant="h6"
              fontWeight="800"
              gutterBottom
              sx={{
                background: "linear-gradient(135deg, #8b6f47 0%, #d4a574 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Individual Furniture Items
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                gap: 2.5,
                mt: 2,
              }}
            >
              {furnitureImages.map((furnitureImg, index) => (
                <Card
                  key={index}
                  elevation={0}
                  sx={{
                    borderRadius: 3,
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    border: "1px solid rgba(212, 165, 116, 0.2)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    "&:hover": {
                      transform: "translateY(-6px) scale(1.03)",
                      boxShadow: "0 12px 28px rgba(139, 111, 71, 0.25)",
                      border: "1px solid rgba(212, 165, 116, 0.4)",
                    },
                  }}
                >
                                  <CardMedia
                  component="a"
                  href={`http://localhost:9999/?product=${furnitureImg.split('/').pop().replace('.jpg', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: 'block',
                    textDecoration: 'none',
                  }}
                >
                  <CardMedia
                    component="img"
                    image={furnitureImg}
                    alt={`Furniture ${index + 1}`}
                    sx={{
                      aspectRatio: "1/1",
                      objectFit: "cover",
                    }}
                  />
                </CardMedia>
                </Card>
              ))}
            </Box>
          </Paper>
        )}
      </Box>
    </Fade>
  )};

  export default ResultsDisplay