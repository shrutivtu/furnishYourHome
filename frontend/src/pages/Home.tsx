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

const Home: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [furnitureImages, setFurnitureImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editPrompt, setEditPrompt] = useState("");

  const BASE_URL = "http://localhost:8000";
  const RESULTS_PATH = "/results";

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!image || !prompt.trim() || !budget.trim()) {
      setError("Please upload an image, enter your vision, and provide a budget.");
      return;
    }

    setLoading(true);
    setError(null);
    setResultImage(null);
    setFurnitureImages([]);

    try {
      // MOCK MODE - Simulate API call with delay
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Mock redesigned image
      const redesignedImagePath = `https://placehold.co/800x600/667eea/white?text=Redesigned+Room`;
      setResultImage(redesignedImagePath);

      // Mock furniture images
      const mockFurnitureIds = ["sofa", "table", "lamp", "chair"];
      const furniturePaths = mockFurnitureIds.map(
        (furnitureId: string) => `https://placehold.co/300x300/764ba2/white?text=Furniture+${furnitureId}`
      );
      setFurnitureImages(furniturePaths);

      /* REAL API CODE - Uncomment when backend is ready
      const paramsData = {
        prompt,
        max_price: parseFloat(budget),
      };

      const formData = new FormData();
      formData.append("params", JSON.stringify(paramsData));
      formData.append("image", image);

      const jobResponse = await fetch(`${BASE_URL}/jobs/generate`, {
        method: "POST",
        body: formData,
      });

      if (!jobResponse.ok) throw new Error("Failed to submit job");
      const jobData = await jobResponse.json();
      const jobId = jobData.job_id;

      let jobStatus = "pending";
      for (let attempt = 0; attempt < 20; attempt++) {
        const statusResponse = await fetch(`${BASE_URL}/jobs/status/${jobId}`);
        if (!statusResponse.ok) throw new Error("Failed to check job status");

        const statusData = await statusResponse.json();
        jobStatus = statusData.job_status;

        if (jobStatus === "done") break;
        if (jobStatus === "failed") throw new Error("Job failed on server");

        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

      if (jobStatus !== "done") throw new Error("Job did not complete in time");

      const resultResponse = await fetch(`${BASE_URL}/jobs/results/${jobId}`);
      if (!resultResponse.ok) throw new Error("Failed to fetch results");

      const resultData = await resultResponse.json();

      const jobIdStr = String(jobId);
      const redesignedImagePath = `${RESULTS_PATH}/${jobIdStr}.png`;
      setResultImage(redesignedImagePath);

      if (resultData.furniture_ids && Array.isArray(resultData.furniture_ids)) {
        const furniturePaths = resultData.furniture_ids.map(
          (furnitureId: string) => `${RESULTS_PATH}/${jobIdStr}_furniture_${furnitureId}.png`
        );
        setFurnitureImages(furniturePaths);
      }
      */
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async () => {
    if (!editPrompt.trim()) {
      setError("Please enter modifications you'd like to make.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // MOCK MODE - Simulate edit API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Update with new mock image
      const updatedImagePath = `https://placehold.co/800x600/5568d3/white?text=Updated+Design`;
      setResultImage(updatedImagePath);
      setEditPrompt("");

      /* REAL EDIT API CODE - Add when backend is ready
      const editData = {
        edit_prompt: editPrompt,
        max_price: parseFloat(budget),
      };

      const editResponse = await fetch(`${BASE_URL}/jobs/edit/${currentJobId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });

      if (!editResponse.ok) throw new Error("Failed to edit design");
      const editJobData = await editResponse.json();
      // Poll for results similar to initial submit...
      */
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5e6d3 0%, #d4a574 50%, #8b6f47 100%)",
        py: 6,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 0%, transparent 50%)",
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 }, position: "relative", zIndex: 1 }}>
        {/* Header */}
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

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: resultImage ? { xs: "1fr", lg: "480px 1fr" } : "1fr",
            gap: 3,
            transition: "all 0.6s ease-in-out",
            justifyContent: resultImage ? "flex-start" : "center",
          }}
        >
          {/* Left Column - Input Form */}
          <Fade in timeout={1000}>
            <Box
              sx={{
                maxWidth: resultImage ? "none" : "650px",
                justifySelf: resultImage ? "flex-start" : "center",
                transition: "all 0.6s ease-in-out",
              }}
            >
              <Paper
                elevation={24}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  background: "rgba(255, 255, 255, 0.98)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.5)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                  transition: "all 0.6s ease-in-out",
                }}
              >
                {/* Image Upload */}
                {!resultImage && (
                  <Box mb={3}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="700"
                      mb={1.5}
                      sx={{
                        background: "linear-gradient(135deg, #8b6f47 0%, #d4a574 100%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      Upload Room Image
                    </Typography>
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
                            PNG, JPG up to 10MB
                          </Typography>
                        </Box>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleImageUpload}
                      />
                    </Button>
                  </Box>
                )}

                {/* Vision Input */}
                {!resultImage && (
                  <Box mb={3}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="700"
                      mb={1.5}
                      sx={{
                        background: "linear-gradient(135deg, #8b6f47 0%, #d4a574 100%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      Describe Your Vision
                    </Typography>
                    <TextField
                      placeholder="e.g., Modern minimalist living room with warm tones and natural light"
                      fullWidth
                      multiline
                      rows={4}
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
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
                )}

                {/* Budget Input */}
                {!resultImage && (
                  <Box mb={3}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="700"
                      mb={1.5}
                      sx={{
                        background: "linear-gradient(135deg, #8b6f47 0%, #d4a574 100%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      Maximum Budget
                    </Typography>
                    <TextField
                      placeholder="Enter your budget"
                      type="number"
                      fullWidth
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
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
                )}

                {/* Error Alert */}
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

                {/* Submit Button */}
                {!resultImage && (
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={handleSubmit}
                    disabled={loading}
                    startIcon={!loading && <AutoAwesome />}
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
                        <span>Redesigning your room...</span>
                      </Box>
                    ) : (
                      "Redesign My Room"
                    )}
                  </Button>
                )}

                {/* Edit Section - Shows after result */}
                {resultImage && (
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

                    <Box mb={3}>
                      <Typography
                        variant="subtitle1"
                        fontWeight="700"
                        mb={1.5}
                        sx={{
                          background: "linear-gradient(135deg, #8b6f47 0%, #d4a574 100%)",
                          backgroundClip: "text",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        Request Changes
                      </Typography>
                      <TextField
                        placeholder="e.g., Make it brighter, add more plants, change sofa color to blue"
                        fullWidth
                        multiline
                        rows={4}
                        value={editPrompt}
                        onChange={(e) => setEditPrompt(e.target.value)}
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

                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      onClick={handleEditSubmit}
                      disabled={loading}
                      startIcon={!loading && <Edit />}
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
                          <span>Updating design...</span>
                        </Box>
                      ) : (
                        "Update Design"
                      )}
                    </Button>

                    <Button
                      variant="text"
                      fullWidth
                      onClick={() => {
                        setResultImage(null);
                        setFurnitureImages([]);
                        setEditPrompt("");
                        setPrompt("");
                        setBudget("");
                        setImage(null);
                        setPreview(null);
                      }}
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
                )}
              </Paper>
            </Box>
          </Fade>

          {/* Right Column - Results */}
          {resultImage && (
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
                            component="img"
                            image={furnitureImg}
                            alt={`Furniture ${index + 1}`}
                            sx={{
                              aspectRatio: "1/1",
                              objectFit: "cover",
                            }}
                          />
                        </Card>
                      ))}
                    </Box>
                  </Paper>
                )}
              </Box>
            </Fade>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Home;