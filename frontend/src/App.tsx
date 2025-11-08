import './App.css';
import { Button, Typography, Container } from '@mui/material';


function App() {

  return (
    <>
      <Container sx={{ textAlign: 'center', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Furnish your home
      </Typography>
      <Button variant="contained" color="primary">
        upload image
      </Button>
    </Container>
    </>
  )
}

export default App
