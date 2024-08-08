import { Box, Button, Typography, Stack } from "@mui/material";
import { Typewriter } from 'react-simple-typewriter';

// The Welcome component is a functional component that displays the main welcome screen
// with a typewriter effect, a prompt, and navigation buttons.
const Welcome = ({ setPage }) => {
  return (
    // Main container box for the Welcome screen
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundImage: `url(/background3.jpg)`, // Background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Typing effect text positioned at the top left */}
      <Typography
        variant="h3"
        textAlign="left"
        color="black"
        sx={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          textShadow: '1px 1px 2px gray', // Text shadow for better visibility
        }}
      >
        Hi, I'm your personal{' '}
        <Typewriter
          words={['Inventory.', 'Grocery List.', 'Shopping Cart.', 'whatever you want me to be.']} // Words to type
          loop={1} // Only loop through the words once
          cursor
          cursorStyle='_'
          typeSpeed={70} // Speed of typing
          deleteSpeed={50} // Speed of deleting
          delaySpeed={1000} // Delay before starting to type the next word
        />
      </Typography>

      {/* Main prompt text */}
      <Typography
        variant="h3"
        textAlign="center"
        color="black"
        sx={{
          textShadow: '1px 1px 2px gray', // Text shadow for better visibility
          mb: 4, // Margin bottom
        }}
      >
        What would you like to do today?
      </Typography>

      {/* Stack containing the main navigation buttons */}
      <Stack direction="row" spacing={2}>
        {/* Add Item button */}
        <Button
          variant="contained"
          onClick={() => setPage("add")}
          sx={{
            backgroundColor: '#1e88e5',
            color: 'white',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
            fontWeight: 'bold',
          }}
        >
          Add Item
        </Button>

        {/* Remove Item button */}
        <Button
          variant="contained"
          onClick={() => setPage("remove")}
          sx={{
            backgroundColor: '#1e88e5',
            color: 'white',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
            fontWeight: 'bold',
          }}
        >
          Remove Item
        </Button>

        {/* See Inventory button */}
        <Button
          variant="contained"
          onClick={() => setPage("inventory")}
          sx={{
            backgroundColor: '#1e88e5',
            color: 'white',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
            fontWeight: 'bold',
          }}
        >
          See Inventory
        </Button>
      </Stack>

      {/* Section for the waitlist prompt and button */}
      <Box
        mt={4} // Margin top
        textAlign="center"
      >
        {/* Waitlist prompt text */}
        <Typography
          variant="h5"
          color="white"
          sx={{
            textShadow: '1px 1px 2px black', // Text shadow for better visibility
            mb: 1, // Margin bottom
          }}
        >
          Like what we do?
        </Typography>

        {/* Join the Waitlist button */}
        <Button
          variant="contained"
          onClick={() => setPage("waitlist")}
          sx={{
            backgroundColor: '#1e88e5',
            color: 'white',
            fontWeight: 'bold',
            padding: '10px 20px', // Padding for larger button
            fontSize: '1.2rem', // Larger font size
            '&:hover': {
              backgroundColor: '#1565c0',
            },
          }}
        >
          Join the Waitlist
        </Button>
      </Box>
    </Box>
  );
};

export default Welcome;
