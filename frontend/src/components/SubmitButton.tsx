import { Button } from '@mui/material';

interface Props {
  onClick: () => void;
}

const SubmitButton: React.FC<Props> = ({ onClick }) => (
  <Button variant="contained" color="primary" onClick={onClick}>
    Submit
  </Button>
);

export default SubmitButton;
