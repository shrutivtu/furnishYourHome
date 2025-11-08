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
} from "@mui/material";
import { Edit } from "@mui/icons-material";

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
        bgcolor: "#f5f7fa",
        py: 4,
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
        {/* Header */}
        <Box textAlign="center" mb={4}>
          <Typography
            variant="h3"
            fontWeight="700"
            color="#1a1a1a"
            gutterBottom
          >
            AI Room Redesigner
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Upload your room photo, describe your vision, and set your budget
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: resultImage ? "40% 1fr" : "1fr",
            gap: 4,
            transition: "all 0.6s ease-in-out",
            justifyContent: resultImage ? "flex-start" : "center",
          }}
        >
          {/* Left Column - Input Form */}
          <Box
            sx={{
              maxWidth: resultImage ? "none" : "600px",
              justifySelf: resultImage ? "flex-start" : "center",
              transition: "all 0.6s ease-in-out",
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 2,
                border: "1px solid #e0e0e0",
                bgcolor: "white",
                width: "100%",
                transition: "all 0.6s ease-in-out",
              }}
            >
              {/* Image Upload */}
              {!resultImage && (
                <Box mb={3}>
                  <Typography variant="subtitle1" fontWeight="600" mb={1.5}>
                    Upload Room Image
                  </Typography>
                  <Button
                    variant="outlined"
                    component="label"
                    fullWidth
                    sx={{
                      height: preview ? "auto" : 200,
                      borderStyle: "dashed",
                      borderWidth: 2,
                      borderColor: "#d0d0d0",
                      borderRadius: 2,
                      bgcolor: "#fafafa",
                      "&:hover": {
                        borderColor: "#667eea",
                        bgcolor: "#f5f7ff",
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
                            borderRadius: 8,
                          }}
                        />
                      </Box>
                    ) : (
                      <Box textAlign="center">
                        <Typography variant="body1" color="text.secondary">
                          Click to upload or drag and drop
                        </Typography>
                        <Typography variant="caption" color="text.secondary" mt={0.5}>
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
                  <Typography variant="subtitle1" fontWeight="600" mb={1.5}>
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
                        bgcolor: "#fafafa",
                      },
                    }}
                  />
                </Box>
              )}

              {/* Budget Input */}
              {!resultImage && (
                <Box mb={3}>
                  <Typography variant="subtitle1" fontWeight="600" mb={1.5}>
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
                        <Typography sx={{ mr: 1, color: "text.secondary" }}>
                          $
                        </Typography>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "#fafafa",
                      },
                    }}
                  />
                </Box>
              )}

              {/* Error Alert */}
              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
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
                  sx={{
                    py: 1.5,
                    fontSize: "1rem",
                    fontWeight: "600",
                    textTransform: "none",
                    bgcolor: "#667eea",
                    "&:hover": {
                      bgcolor: "#5568d3",
                    },
                    "&:disabled": {
                      bgcolor: "#e0e0e0",
                    },
                  }}
                >
                  {loading ? (
                    <Box display="flex" alignItems="center" gap={1.5}>
                      <CircularProgress size={20} color="inherit" />
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
                  <Typography variant="h6" fontWeight="700" mb={2} color="#1a1a1a">
                    Refine Your Design
                  </Typography>

                  <Box mb={3}>
                    <Typography variant="subtitle1" fontWeight="600" mb={1.5}>
                      {resultImage ? "Request Changes" : "Describe Your Vision"}
                    </Typography>
                    <TextField
                      placeholder={
                        resultImage
                          ? "e.g., Make it brighter, add more plants, change sofa color to blue"
                          : "e.g., Modern minimalist living room with warm tones and natural light"
                      }
                      fullWidth
                      multiline
                      rows={4}
                      value={resultImage ? editPrompt : prompt}
                      onChange={(e) =>
                        resultImage
                          ? setEditPrompt(e.target.value)
                          : setPrompt(e.target.value)
                      }
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          bgcolor: "#fafafa",
                        },
                      }}
                    />
                  </Box>

                  <Box mb={2}>
                    <Typography variant="subtitle2" fontWeight="600" mb={1}>
                      Budget: ${budget}
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={handleEditSubmit}
                    disabled={loading}
                    startIcon={<Edit />}
                    sx={{
                      py: 1.5,
                      fontSize: "1rem",
                      fontWeight: "600",
                      textTransform: "none",
                      bgcolor: "#667eea",
                      "&:hover": {
                        bgcolor: "#5568d3",
                      },
                      "&:disabled": {
                        bgcolor: "#e0e0e0",
                      },
                    }}
                  >
                    {loading ? (
                      <Box display="flex" alignItems="center" gap={1.5}>
                        <CircularProgress size={20} color="inherit" />
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
                      color: "#667eea",
                      textTransform: "none",
                    }}
                  >
                    Start New Design
                  </Button>
                </Box>
              )}
            </Paper>
          </Box>

          {/* Right Column - Results */}
          {resultImage && (
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
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  border: "1px solid #e0e0e0",
                  bgcolor: "white",
                  mb: 3,
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight="700"
                  gutterBottom
                  color="#1a1a1a"
                >
                  Your Redesigned Room
                </Typography>
                <Box mt={2}>
                  <img
                    src={resultImage}
                    alt="Redesigned Room"
                    style={{
                      width: "100%",
                      borderRadius: 8,
                      border: "1px solid #e0e0e0",
                    }}
                  />
                </Box>
              </Paper>

              {/* Furniture Items */}
              {furnitureImages.length > 0 && (
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    border: "1px solid #e0e0e0",
                    bgcolor: "white",
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight="700"
                    gutterBottom
                    color="#1a1a1a"
                  >
                    Individual Furniture Items
                  </Typography>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                      gap: 2,
                      mt: 1,
                    }}
                  >
                    {furnitureImages.map((furnitureImg, index) => (
                      <Card
                        key={index}
                        elevation={0}
                        sx={{
                          borderRadius: 2,
                          border: "1px solid #e0e0e0",
                          overflow: "hidden",
                          cursor: "pointer",
                          transition: "transform 0.2s",
                          "&:hover": {
                            transform: "scale(1.05)",
                          },
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={furnitureImg}
                          alt={`Furniture ${index + 1}`}
                          sx={{ aspectRatio: "1/1", objectFit: "cover" }}
                        />
                      </Card>
                    ))}
                  </Box>
                </Paper>
              )}
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Home;