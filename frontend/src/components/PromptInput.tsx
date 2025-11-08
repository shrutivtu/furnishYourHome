import { TextField, Box } from '@mui/material';

interface Props {
  prompt: string;
  setPrompt: (value: string) => void;
}

const PromptInput: React.FC<Props> = ({ prompt, setPrompt }) => (
  <Box mb={2}>
    <TextField
      fullWidth
      label="Describe your prompt"
      value={prompt}
      onChange={(e) => setPrompt(e.target.value)}
      multiline
      rows={3}
      variant="outlined"
    />
  </Box>
);

export default PromptInput;
