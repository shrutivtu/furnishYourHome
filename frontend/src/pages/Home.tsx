import React, { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Fade,
} from "@mui/material";
import Header from '../components/Header';
import InitialForm from "../components/InitialForm";
import EditForm from "../components/EditForm";
import ResultsDisplay from "../components/ResultsDisplay";

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
  const [totalPrice, setTotalPrice] = useState<number | null>(null);

  const BASE_URL = "http://localhost:8000";
  const RESULTS_PATH = "/Users/shrutisaxena/Documents/jobprep/hackathon/furnishYourHome/results/";

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!["image/jpeg", "image/jpg"].includes(file.type)) {
        setError("Only JPEG images are allowed.");
        return;
      }
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
    setTotalPrice(null); // reset previous total price
  
    try {
      const paramsData = {
        prompt,
        max_price: parseFloat(budget),
      };
  
      const formData = new FormData();
      formData.append("params", JSON.stringify(paramsData));
      formData.append("image", image);
  
      // 1. Submit the job
      const jobResponse = await fetch(`${BASE_URL}/jobs/generate`, {
        method: "POST",
        body: formData,
      });
  
      if (!jobResponse.ok) throw new Error("Failed to submit job");
  
      const jobData = await jobResponse.json();
      const jobId = jobData.job_id;
  
      // 2. Poll for status
      let jobStatus = "pending";
      for (let attempt = 0; attempt < 70; attempt++) {
        const statusResponse = await fetch(`${BASE_URL}/jobs/status/${jobId}`);
        if (!statusResponse.ok) throw new Error("Failed to check job status");
  
        const statusData = await statusResponse.json();
        jobStatus = statusData.job_status;
  
        if (jobStatus === "done") break;
        if (jobStatus === "failed") throw new Error("Job failed on server");
  
        await new Promise((resolve) => setTimeout(resolve, 2000)); // wait 2s
      }
  
      if (jobStatus !== "done") throw new Error("Job did not complete in time");
  
      // 3. Fetch results
      const resultResponse = await fetch(`${BASE_URL}/jobs/results/${jobId}`);
      if (!resultResponse.ok) throw new Error("Failed to fetch results");
  
      const resultData = await resultResponse.json();
      const jobIdStr = String(jobId);
  
      // Redesigned room image
      console.log(jobIdStr);
      const redesignedImagePath = `${RESULTS_PATH}/${jobIdStr}.png`;
      console.log(redesignedImagePath)
      setResultImage(redesignedImagePath);
  
      // Furniture images
      if (resultData.furniture_ids && Array.isArray(resultData.furniture_ids)) {
        const furniturePaths = resultData.furniture_ids.map(
          (furnitureId: string) => `${RESULTS_PATH}/${jobIdStr}_furniture_${furnitureId}.jpg`
        );
        setFurnitureImages(furniturePaths);
      }
  
      // Total price
      if (resultData.total_price) {
        setTotalPrice(resultData.total_price);
      }
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
      const editData = {
        edit_prompt: editPrompt,
        max_price: parseFloat(budget),
      };
  
      // 1. Submit edit job
      const editResponse = await fetch(`${BASE_URL}/jobs/edit/${currentJobId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });
  
      if (!editResponse.ok) throw new Error("Failed to submit edit job");
  
      const editJobData = await editResponse.json();
      const editJobId = editJobData.job_id;
  
      // 2. Poll for status
      let jobStatus = "pending";
      for (let attempt = 0; attempt < 70; attempt++) {
        const statusResponse = await fetch(`${BASE_URL}/jobs/status/${editJobId}`);
        if (!statusResponse.ok) throw new Error("Failed to check edit job status");
  
        const statusData = await statusResponse.json();
        jobStatus = statusData.job_status;
  
        if (jobStatus === "done") break;
        if (jobStatus === "failed") throw new Error("Edit job failed on server");
  
        await new Promise((resolve) => setTimeout(resolve, 2000)); // wait 2s
      }
  
      if (jobStatus !== "done") throw new Error("Edit job did not complete in time");
  
      // 3. Fetch results
      const resultResponse = await fetch(`${BASE_URL}/jobs/results/${editJobId}`);
      if (!resultResponse.ok) throw new Error("Failed to fetch edit results");
  
      const resultData = await resultResponse.json();
      const jobIdStr = String(editJobId);
  
      // Updated redesigned room image
      const updatedImagePath = `${RESULTS_PATH}/${jobIdStr}.png`;
      setResultImage(updatedImagePath);
  
      // Furniture images
      if (resultData.furniture_ids && Array.isArray(resultData.furniture_ids)) {
        const furniturePaths = resultData.furniture_ids.map(
          (furnitureId: string) => `${RESULTS_PATH}/${jobIdStr}_furniture_${furnitureId}.png`
        );
        setFurnitureImages(furniturePaths);
      }
  
      // Total price
      if (resultData.total_price) {
        setTotalPrice(resultData.total_price);
      }
  
      setEditPrompt("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };  

  const handleStartNew = () => {
    setResultImage(null);
    setFurnitureImages([]);
    setEditPrompt("");
    setPrompt("");
    setBudget("");
    setImage(null);
    setPreview(null);
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
        <Header />

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
                {!resultImage ? (
                  <InitialForm
                    preview={preview}
                    prompt={prompt}
                    budget={budget}
                    loading={loading}
                    error={error}
                    onImageUpload={handleImageUpload}
                    onPromptChange={setPrompt}
                    onBudgetChange={setBudget}
                    onSubmit={handleSubmit}
                  />
                ) : (
                  <EditForm
                    editPrompt={editPrompt}
                    budget={budget}
                    loading={loading}
                    error={error}
                    onEditPromptChange={setEditPrompt}
                    onEditSubmit={handleEditSubmit}
                    onStartNew={handleStartNew}
                  />
                )}
              </Paper>
            </Box>
          </Fade>

          {/* Right Column - Results */}
          {resultImage && (
            <ResultsDisplay
              resultImage={resultImage}
              furnitureImages={furnitureImages}
              totalPrice={totalPrice}
            />
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Home;