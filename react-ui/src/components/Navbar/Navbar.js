import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import title_logo from '../../assets/title_logo1.png';
import { Box, IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';

// import './Navbar.css';

const Navbar = () => {
  return (
    <div className="app__navbar">
      <AppBar position="static"
        sx={{
          backgroundColor: "#fff",
          boxShadow: "05px 5px 10px rgb(233, 232, 232)"
        }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="primary"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            component="img"
            sx={{
              height: 70,
              width: 80,
              padding: "10px",
              margin: "10px"
            }}
            alt="The house from the offer."
            src={title_logo}>

          </Box>
          <Typography variant="h3"
            sx={{
              fontSize: "25px",
              color: "black",
              fontFamily: "Poppins",
              fontWeight: "600",
              flexGrow: 1
            }}>
            Pravinyam:Learn the right way
          </Typography>
          <Button href="#login" sx={{
            fontSize: "16px",
            fontFamily: "poppins",
            textTransform: 'capitalize',
            fontWeight: "bold",
            color: "inherit",
            border: "2px solid #8a2be2",
            borderRadius: "5px",
            boxShadow: "2px 2px 5px #8a2be2",
            padding: "5px 12px",
            backgroundColor: '#8a2be2',
            "&:hover": {
              backgroundColor: '#8a2be2',
            },
          }}>
            Log In
          </Button>
        </Toolbar>
      </AppBar>

      {/* Section - 1 */}
      {/* <div className="app__section1">
        <div className="app__navbar-logo">
          <img src={title_logo} alt="title logo" />
          <p className="app__navbar-title">Pravinyam:Learn the right way</p>
        </div>

        <ul className="app__navbar-links">
          <li className="app__signin">
            <a href="#login">Log In</a>
          </li>
        </ul>
      </div> */}

      {/* Section - 2 */}
      {/* <div className="app__section2">
        <div className="app__menu-items">
          <ul className="app__menu-links">
            <li className="app__tracks"><a href="#tracks">Tracks</a></li>
            <li className="app__exercise"><a href="#exercise">Exercise</a></li>
            <li className="app__tourofconcept"><a href="#tourofconcept">Tour of Concept</a></li>
            <li className="app__myjourney"><a href="#myjourney">My Journey</a></li>
          </ul>
        </div>
      </div> */}
    </div>

  )

}

export default Navbar