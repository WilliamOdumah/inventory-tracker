// HomeButton.js
import { Button } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';

const HomeButton = ({ setPage }) => {
  return (
    <Button 
      variant="contained" 
      onClick={() => setPage("welcome")}
      style={{ position: 'fixed', top: '20px', left: '20px' }}
      startIcon={<HomeIcon />}
    >
      Home
    </Button>
  );
};

export default HomeButton;
