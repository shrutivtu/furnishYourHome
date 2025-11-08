import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

interface Props {
  onImageSelect: (file: File | null) => void;
}

const ImageUploader: React.FC<Props> = ({ onImageSelect }) => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFileName(file?.name || null);
    onImageSelect(file);
  };

  return (
    <Box mb={2}>
      <Button variant="contained" component="label">
        Upload Image
        <input type="file" accept="image/*" hidden onChange={handleChange} />
      </Button>
      {fileName && <Typography mt={1}>Selected: {fileName}</Typography>}
    </Box>
  );
};

export default ImageUploader;
