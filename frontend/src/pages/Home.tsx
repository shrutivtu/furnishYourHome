import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Alert,
  Paper,
  TextField,
  Fade,
  Chip,
} from '@mui/material';
import {
  CloudUpload,
  AutoAwesome,
  ShoppingCart,
  OpenInNew,
  Refresh
} from '@mui/icons-material';

interface FurnitureItem {
  id: string;
  name: string;
  price?: number;
  imageUrl: string;
  provider: string;
}

interface RedesignResponse {
  redesignedImageUrl: string;
  furnitureItems: FurnitureItem[];
  shopUrl?: string;
}

const Home: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [redesignData, setRedesignData] = useState<RedesignResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [refinementPrompt, setRefinementPrompt] = useState('');
  const [refining, setRefining] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    setError('');

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      setError('Please upload a room image');
      return;
    }

    if (!prompt.trim()) {
      setError('Please enter a prompt describing how you want to redesign the room');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // MOCK DATA - Remove this when you have real backend
      await new Promise(resolve => setTimeout(resolve, 2000));

      const mockData: RedesignResponse = {
        redesignedImageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200',
        shopUrl: 'https://your-furniture-shop.com/collection/modern-living',
        furnitureItems: [
          {
            id: '1',
            name: 'Modern Gray Sofa',
            price: 899,
            imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
            provider: 'IKEA'
          },
          {
            id: '2',
            name: 'Oak Coffee Table',
            price: 299,
            imageUrl: 'https://images.unsplash.com/photo-1617098900591-6f29f7d72a36?w=400',
            provider: 'West Elm'
          },
          {
            id: '3',
            name: 'Floor Lamp',
            price: 149,
            imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400',
            provider: 'CB2'
          },
          {
            id: '4',
            name: 'Wall Art',
            price: 79,
            imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=400',
            provider: 'Article'
          },
          {
            id: '5',
            name: 'Area Rug',
            price: 349,
            imageUrl: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400',
            provider: 'Wayfair'
          },
          {
            id: '6',
            name: 'Throw Pillows',
            price: 45,
            imageUrl: 'https://images.unsplash.com/photo-1584208632869-05fa2b2a5934?w=400',
            provider: 'Target'
          }
        ]
      };

      setRedesignData(mockData);
      // END MOCK DATA

      // Real API call
      /*
      const formData = new FormData();
      formData.append('image', image);
      formData.append('prompt', prompt);

      const response = await fetch('/api/redesign', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to redesign room');
      }

      const data: RedesignResponse = await response.json();
      setRedesignData(data);
      */

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate redesign. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefinement = async () => {
    if (!refinementPrompt.trim()) {
      setError('Please enter a refinement prompt');
      return;
    }

    setRefining(true);
    setError('');

    try {
      // MOCK - In real app, send refinement request to backend
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate updated design
      const updatedData: RedesignResponse = {
        ...redesignData!,
        redesignedImageUrl: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=1200', // Different room
      };

      setRedesignData(updatedData);
      setRefinementPrompt('');

      /*
      // Real API call
      const formData = new FormData();
      formData.append('originalImage', image);
      formData.append('refinementPrompt', refinementPrompt);
      formData.append('previousDesign', redesignData.redesignedImageUrl);

      const response = await fetch('/api/refine-redesign', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setRedesignData(data);
      */

    } catch (err) {
      setError('Failed to refine design. Please try again.');
    } finally {
      setRefining(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setPreview(null);
    setPrompt('');
    setRedesignData(null);
    setError('');
    setRefinementPrompt('');
  };

  const handleShopClick = () => {
    const shopUrl = redesignData?.shopUrl || 'https://your-furniture-shop.com';
    window.open(shopUrl, '_blank');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f7fa', py: 4 }}>
      <Container maxWidth={redesignData ? 'lg' : 'sm'} sx={{ transition: 'max-width 0.5s ease' }}>
        {/* Header */}
        <Box textAlign="center" mb={4}>
          <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ color: '#1a237e' }}>
            AI Room Redesigner
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {redesignData ? 'Your Redesigned Space' : 'Upload your room and describe your vision'}
          </Typography>
        </Box>

        {/* Centered Input (Before Submission) */}
        {!redesignData && (
          <Fade in={!redesignData}>
            <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
              <CardContent sx={{ p: 4 }}>
                {/* Image Upload */}
                <Box mb={3}>
                  <Typography variant="h6" mb={2} fontWeight="600">
                    Upload Room Photo
                  </Typography>
                  <Button
                    variant="outlined"
                    component="label"
                    fullWidth
                    startIcon={<CloudUpload />}
                    sx={{
                      py: 3,
                      borderStyle: 'dashed',
                      borderWidth: 2,
                      '&:hover': { borderStyle: 'dashed' }
                    }}
                  >
                    {preview ? 'Change Image' : 'Select Room Image'}
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleImageChange}
                    />
                  </Button>

                  {preview && (
                    <Paper elevation={2} sx={{ mt: 3, p: 2, bgcolor: '#fafafa' }}>
                      <img
                        src={preview}
                        alt="Room preview"
                        style={{
                          width: '100%',
                          maxHeight: 300,
                          borderRadius: 8,
                          objectFit: 'cover'
                        }}
                      />
                    </Paper>
                  )}
                </Box>

                {/* Prompt Textarea */}
                <Box mb={3}>
                  <Typography variant="h6" mb={2} fontWeight="600">
                    Describe Your Vision
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    placeholder="E.g., Modern minimalist living room with warm tones, cozy seating area, and natural lighting"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        bgcolor: '#fafafa'
                      }
                    }}
                  />
                </Box>

                {/* Error Message */}
                {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}

                {/* Submit Button */}
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={handleSubmit}
                  disabled={loading || !image || !prompt.trim()}
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AutoAwesome />}
                  sx={{ py: 1.5, fontSize: '1.1rem' }}
                >
                  {loading ? 'Redesigning Your Room...' : 'Redesign Room'}
                </Button>
              </CardContent>
            </Card>
          </Fade>
        )}

        {/* Results View (After Submission) */}
        {redesignData && (
          <Fade in={!!redesignData}>
            <Box>
              {/* Redesigned Room Image - Full Width */}
              <Card sx={{ boxShadow: 4, borderRadius: 3, mb: 4, overflow: 'hidden' }}>
                <Box sx={{ position: 'relative' }}>
                  <img
                    src={redesignData.redesignedImageUrl}
                    alt="Redesigned room"
                    style={{
                      width: '100%',
                      height: '500px',
                      objectFit: 'cover'
                    }}
                  />
                  {/* AI Badge Overlay */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 20,
                      right: 20,
                      bgcolor: 'rgba(25, 118, 210, 0.95)',
                      color: 'white',
                      px: 2.5,
                      py: 1,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      boxShadow: 3
                    }}
                  >
                    <AutoAwesome sx={{ fontSize: 20 }} />
                    <Typography variant="body2" fontWeight="600">
                      AI Redesigned
                    </Typography>
                  </Box>
                </Box>
              </Card>

              {/* Furniture Items Grid */}
              {/* Furniture Items Grid */}
              <Box mb={4}>
                <Typography variant="h5" fontWeight="600" mb={3} sx={{ color: '#1a237e' }}>
                  Featured Furniture & Decor
                </Typography>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: 'repeat(2, 1fr)',  // 2 columns on mobile
                      sm: 'repeat(3, 1fr)',  // 3 columns on tablet
                      md: 'repeat(6, 1fr)'   // 6 columns on desktop
                    },
                    gap: 3
                  }}
                >
                  {redesignData.furnitureItems.map((item) => (
                    <Card
                      key={item.id}
                      sx={{
                        boxShadow: 2,
                        borderRadius: 2,
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: 4
                        }
                      }}
                    >
                      <Box
                        sx={{
                          width: '100%',
                          height: 140,
                          overflow: 'hidden',
                          bgcolor: '#f5f5f5'
                        }}
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </Box>
                      <CardContent sx={{ p: 1.5 }}>
                        <Typography
                          variant="body2"
                          fontWeight="600"
                          sx={{
                            mb: 0.5,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {item.name}
                        </Typography>
                        <Chip
                          label={item.provider}
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: '0.7rem',
                            mb: 0.5,
                            bgcolor: '#e3f2fd',
                            color: '#1976d2'
                          }}
                        />
                        {item.price && (
                          <Typography variant="body2" fontWeight="700" color="primary">
                            ${item.price}
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </Box>

              {/* Shop That Look Button */}
              <Box mb={4} textAlign="center">
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleShopClick}
                  startIcon={<ShoppingCart />}
                  endIcon={<OpenInNew />}
                  sx={{
                    py: 2,
                    px: 6,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: 3,
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5568d3 0%, #653a8b 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: 6
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Shop This Look
                </Button>
              </Box>

              {/* Refinement Section */}
              <Card sx={{ boxShadow: 3, borderRadius: 3, mb: 3 }}>
                <CardContent sx={{ p: 4 }}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Refresh sx={{ mr: 1.5, color: '#1976d2' }} />
                    <Typography variant="h6" fontWeight="600">
                      Want to refine this design?
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" mb={3}>
                    Describe any changes you'd like to make to the current design
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    placeholder="E.g., Make it more colorful, add more plants, change the sofa color to blue"
                    value={refinementPrompt}
                    onChange={(e) => setRefinementPrompt(e.target.value)}
                    variant="outlined"
                    sx={{
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        bgcolor: '#fafafa'
                      }
                    }}
                  />
                  <Box display="flex" gap={2}>
                    <Button
                      variant="contained"
                      onClick={handleRefinement}
                      disabled={refining || !refinementPrompt.trim()}
                      startIcon={refining ? <CircularProgress size={20} color="inherit" /> : <AutoAwesome />}
                      sx={{ flex: 1 }}
                    >
                      {refining ? 'Refining Design...' : 'Refine Design'}
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={handleReset}
                      sx={{ flex: 1 }}
                    >
                      Start New Design
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Fade>
        )}

        {/* Info Section (Only show before submission) */}
        {!redesignData && !loading && (
          <Fade in={!redesignData}>
            <Box mt={6} textAlign="center">
              <Paper sx={{ maxWidth: 500, mx: 'auto', p: 3, bgcolor: '#e3f2fd' }}>
                <Typography variant="body2" color="text.secondary">
                  <strong>How it works:</strong> Upload a photo of your room and describe your vision.
                  Our AI will redesign it using items from our inventory.
                </Typography>
              </Paper>
            </Box>
          </Fade>
        )}
      </Container>
    </Box>
  );
};

export default Home;