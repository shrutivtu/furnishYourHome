import { useState } from 'react';
import { Container, Typography, Box, Card, CardContent, Button, TextField } from '@mui/material';

const Home: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [prompt, setPrompt] = useState('');
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = () => {
    console.log('Image:', image);
    console.log('Prompt:', prompt);
    // Handle API call here
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}
    >
      <Card sx={{ width: '100%', p: 3, boxShadow: 6, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h4" mb={3} textAlign="center">
            Design Your Home
          </Typography>

          {/* Image Upload */}
          <Box mb={2} textAlign="center">
            <Button variant="contained" component="label" sx={{ mb: 1 }}>
              Upload Image
              <input type="file" accept="image/*" hidden onChange={handleImageChange} />
            </Button>
            {preview && (
              <Box mt={2}>
                <img
                  src={preview}
                  alt="Preview"
                  style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8, objectFit: 'cover' }}
                />
              </Box>
            )}
          </Box>

          {/* Prompt Input */}
          <TextField
            fullWidth
            label="Describe your prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            multiline
            rows={4}
            variant="outlined"
            sx={{ mb: 3 }}
          />

          {/* Submit Button */}
          <Box textAlign="center">
            <Button variant="contained" color="primary" size="large" onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Home;
