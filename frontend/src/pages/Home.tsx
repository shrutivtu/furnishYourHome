import { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import ImageUploader from '../components/ImageUploader';
import PromptInput from '../components/PromptInput';
import SubmitButton from '../components/SubmitButton';

const Home: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [prompt, setPrompt] = useState('');

  const handleSubmit = () => {
    console.log('Image:', image);
    console.log('Prompt:', prompt);
    // Add API call or processing logic here
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" mb={3} textAlign="center">
        Image + Prompt Input
      </Typography>

      <ImageUploader onImageSelect={setImage} />
      <PromptInput prompt={prompt} setPrompt={setPrompt} />
      <Box textAlign="center">
        <SubmitButton onClick={handleSubmit} />
      </Box>
    </Container>
  );
};

export default Home;
