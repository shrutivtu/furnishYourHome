import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";

const Home: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const BASE_URL = "http://localhost:8000"; // Change if backend hosted elsewhere

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

    try {
      // Step 1: Prepare form data
      const paramsData = {
        prompt,
        max_price: parseFloat(budget),
      };

      const formData = new FormData();
      formData.append("params", JSON.stringify(paramsData));
      formData.append("image", image);

      // Step 2: Submit the job
      const jobResponse = await fetch(`${BASE_URL}/jobs/generate`, {
        method: "POST",
        body: formData,
      });

      if (!jobResponse.ok) throw new Error("Failed to submit job");
      const jobData = await jobResponse.json();
      const jobId = jobData.job_id;

      // Step 3: Poll for job status
      let jobStatus = "pending";
      for (let attempt = 0; attempt < 20; attempt++) {
        const statusResponse = await fetch(`${BASE_URL}/jobs/status/${jobId}`);
        if (!statusResponse.ok) throw new Error("Failed to check job status");

        const statusData = await statusResponse.json();
        jobStatus = statusData.job_status;

        if (jobStatus === "done") break;
        if (jobStatus === "failed") throw new Error("Job failed on server");

        await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2s
      }

      if (jobStatus !== "done") throw new Error("Job did not complete in time");

      // Step 4: Fetch the results
      const resultResponse = await fetch(`${BASE_URL}/jobs/results/${jobId}`);
      if (!resultResponse.ok) throw new Error("Failed to fetch results");

      const resultData = await resultResponse.json();

      // Assuming backend returns `redesignedImageUrl`
      setResultImage(resultData.redesignedImageUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        AI Room Redesigner
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Upload your room photo, describe your vision, and set your budget.
      </Typography>

      {/* Image Upload */}
      <Box mt={4} mb={3}>
        <Button variant="outlined" component="label">
          {preview ? "Change Image" : "Upload Room Image"}
          <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
        </Button>
        {preview && (
          <Box mt={2}>
            <img
              src={preview}
              alt="Preview"
              style={{ maxWidth: "100%", borderRadius: 8 }}
            />
          </Box>
        )}
      </Box>

      {/* Prompt Input */}
      <Box mb={3}>
        <TextField
          label="Describe your vision"
          fullWidth
          multiline
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </Box>

      {/* Budget Input */}
      <Box mb={3}>
        <TextField
          label="Maximum Budget ($)"
          type="number"
          fullWidth
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Button
        variant="contained"
        size="large"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Redesign Room"}
      </Button>

      {/* Result */}
      {resultImage && (
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Your Redesigned Room
          </Typography>
          <img
            src={resultImage}
            alt="Redesigned Room"
            style={{ width: "100%", borderRadius: 8 }}
          />
        </Box>
      )}
    </Box>
  );
};

export default Home;
