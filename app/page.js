"use client"; // This is a Next.js directive for client-side rendering
import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { firestore } from "@/firebase";
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Welcome from "./Welcome";
import HomeButton from "./HomeButton"; // Ensure this path is correct based on your file structure

// Style object for the modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 3,
};

export default function Home() {
  // State variables
  const [page, setPage] = useState("welcome");
  const [pantry, setPantry] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");

  // Handlers for opening and closing the modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Function to update the pantry state with data from Firestore
  const updatePantry = async () => {
    const snapshot = query(collection(firestore, "pantry"));
    const docs = await getDocs(snapshot);
    const pantryList = [];
    docs.forEach((doc) => {
      pantryList.push({ name: doc.id, ...doc.data() });
    });
    console.log(pantryList);
    setPantry(pantryList);
  };

  useEffect(() => {
    // Fetch pantry data on component mount
    updatePantry();

    // Function to clear pantry data before the page unloads
    const handleBeforeUnload = async (event) => {
      event.preventDefault();
      await clearPantry();
    };

    // Add event listener for page unload
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup event listener and clear pantry on component unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      clearPantry();
    };
  }, []);

  // Function to clear all pantry data from Firestore
  const clearPantry = async () => {
    const snapshot = query(collection(firestore, "pantry"));
    const docs = await getDocs(snapshot);
    docs.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  };

  // Function to add an item to the pantry
  const addItem = async (item) => {
    const docRef = doc(collection(firestore, "pantry"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { count } = docSnap.data();
      await setDoc(docRef, { count: count + 1 });
    } else {
      await setDoc(docRef, { count: 1 });
    }
    await updatePantry();
  };

  // Function to remove an item from the pantry
  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, "pantry"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { count } = docSnap.data();
      if (count === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { count: count - 1 });
      }
    }
    await updatePantry();
  };

  // Function to render content based on the current page
  const renderContent = () => {
    switch (page) {
      case "welcome":
        return <Welcome setPage={setPage} />;
      case "add":
        return (
          <Box
            width="100vw"
            height="100vh"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap={2}
          >
            <HomeButton setPage={setPage} />
            <Typography variant="h5">What item would you like to add?</Typography>
            <Stack direction="row" spacing={2}>
              <TextField
                id="outlined-basic"
                label="Item"
                variant="outlined"
                fullWidth
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
              <Button
                variant="contained"
                onClick={() => {
                  addItem(itemName);
                  setItemName("");
                  setPage("welcome");
                }}
              >
                Add
              </Button>
            </Stack>
          </Box>
        );
      case "remove":
        return (
          <Box
            width="100vw"
            height="100vh"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap={2}
          >
            <HomeButton setPage={setPage} />
            {pantry.length === 0 ? (
              <>
                <Typography variant="h5">You currently do not have any saved inventory.</Typography>
                <Box textAlign="center" mt={2}>
                  <Typography variant="h6" mb={1}>
                    Become a user!
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => setPage("waitlist")}
                    sx={{
                      backgroundColor: '#1e88e5',
                      color: 'white',
                      fontWeight: 'bold',
                      padding: '10px 20px',
                      fontSize: '1.2rem',
                      '&:hover': {
                        backgroundColor: '#1565c0',
                      },
                    }}
                  >
                    Join the Waitlist
                  </Button>
                </Box>
              </>
            ) : (
              <Stack width="800px" height="300px" spacing={2} overflow="auto">
                {pantry.map(({ name, count }) => (
                  <Box
                    key={name}
                    width="100%"
                    minHeight="150px"
                    display="flex"
                    justifyContent="space-between"
                    paddingX={5}
                    alignItems="center"
                    bgcolor="#f0f0f0"
                  >
                    <Typography variant="h3" color="#333" textAlign="center">
                      {name.charAt(0).toUpperCase() + name.slice(1)}
                    </Typography>
                    <Typography variant="h3" color="#333" textAlign="center">
                      Quantity: {count}
                    </Typography>
                    <Button variant="contained" onClick={() => removeItem(name)}>
                      Remove
                    </Button>
                  </Box>
                ))}
              </Stack>
            )}
          </Box>
        );
      case "inventory":
        return (
          <Box
            width="100vw"
            height="100vh"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap={2}
          >
            <HomeButton setPage={setPage} />
            {pantry.length === 0 ? (
              <>
                <Typography variant="h5">You currently do not have any saved inventory.</Typography>
                <Box textAlign="center" mt={2}>
                  <Typography variant="h6" mb={1}>
                    Become a user!
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => setPage("waitlist")}
                    sx={{
                      backgroundColor: '#1e88e5',
                      color: 'white',
                      fontWeight: 'bold',
                      padding: '10px 20px',
                      fontSize: '1.2rem',
                      '&:hover': {
                        backgroundColor: '#1565c0',
                      },
                    }}
                  >
                    Join the Waitlist
                  </Button>
                </Box>
              </>
            ) : (
              <Stack width="800px" height="300px" spacing={2} overflow="auto">
                {pantry.map(({ name, count }) => (
                  <Box
                    key={name}
                    width="100%"
                    minHeight="150px"
                    display="flex"
                    justifyContent="space-between"
                    paddingX={5}
                    alignItems="center"
                    bgcolor="#f0f0f0"
                  >
                    <Typography variant="h3" color="#333" textAlign="center">
                      {name.charAt(0).toUpperCase() + name.slice(1)}
                    </Typography>
                    <Typography variant="h3" color="#333" textAlign="center">
                      Quantity: {count}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            )}
          </Box>
        );
      case "waitlist":
        return (
          <Box
            width="100vw"
            height="100vh"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap={2}
          >
            <HomeButton setPage={setPage} />
            <Typography variant="h5">Join Waitlist</Typography>
            <Stack direction="column" spacing={2}>
              <TextField id="username" label="Username" variant="outlined" fullWidth />
              <TextField id="email" label="Email" variant="outlined" fullWidth />
              <Button variant="contained" onClick={() => sendWaitlistEmail()}>
                Submit
              </Button>
            </Stack>
          </Box>
        );
      default:
        return <Welcome setPage={setPage} />;
    }
  };

  // Function to send an email for waitlist request
  const sendWaitlistEmail = () => {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    window.location.href = `mailto:williamodumah@gmail.com?subject=Waitlist%20Request&body=Username:%20${username}%0AEmail:%20${email}`;
  };

  return <>{renderContent()}</>;
}
