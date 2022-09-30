import React from 'react'
import { useState } from "react";
// import './Users.css';
import Container from '@mui/material/Container';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
// import datasrc from './data'
import { Link } from 'react-router-dom';
import SelectLang from './SelectLang';
import { useEffect } from 'react';


const Users = () => {

  const [modules, setModules] = useState([]);

  useEffect(() => {
    getModules();
  }, []);

  function getModules() {
    fetch("http://localhost:8090/api/modules")
      .then((result => {
        result.json().then((res) => {
          console.log(res);
          setModules(res)
        })
      }))
  }


  return (
    <>
      <Container maxWidth="100%">
        <Box sx={{
          height: '100vh',
          margin: '1rem 1rem'
        }} >
          <Typography sx={{
            fontFamily: 'Poppins',
            fontWeight: 'bold',
            fontSize: '2rem',
          }}>
            Welcome back user 1,you are on the right place.
          </Typography>

          {/* users */}
          <Box sx={{
            width: '100%',
            height: '100px',
            margin: '1rem 1rem 0 1rem',
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center'
          }}>

            {/* tracks */}
            <Typography sx={{
              paddingRight: '2rem',
              fontWeight: 'bold'
            }}>
              Tracks
            </Typography>


            <SelectLang />

            {/* checkpoint */}
            <Button sx={{
              border: '1px solid #7b1fa2',
              borderRadius: '.5em',
              justifyContent: 'end',
              boxShadow: "03px 3px 8px #7b1fa2",
              backgroundColor: '#7b1fa2',
              "&:hover": {
                backgroundColor: '#7b1fa2'
              }
            }}>
              <Typography variant="inherit" sx={{
                textTransform: 'none',
                fontSize: '18px',
                fontWeight: 'bold',
                color: 'white',
                padding: '2px 5px'
              }}>
                Take me where I left
              </Typography>
            </Button>
          </Box>

          <Grid container sx={{
            marginTop: '2rem',
            display: 'flex',
            justifyContent: 'space-evenly',
          }}>
            {modules.map(({ title, description, module, moduleid }) => {
              return (
                <Grid item key={moduleid}>
                  <Button component={Link} to={module} disableRipple sx={{
                    border: '1px solid purple',
                    display: 'flex',
                    justifyContent: 'left',
                    width: '300px',
                    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 8px, rgba(0, 0, 0, 0.23) 0px 3px 8px',
                    "&:hover": {
                      boxShadow: 'rgba(0, 0, 0, 0.16) 3px 3px 8px, rgba(0, 0, 0, 0.23) 0px 3px 8px',
                      backgroundColor: 'white',
                    },
                  }}>
                    <Box sx={{
                      padding: '2rem',
                    }}>
                      <Typography sx={{
                        fontFamily: 'Poppins',
                        fontSize: '1.5rem',
                        fontWeight: '600',
                        color: 'black',
                        textTransform: 'capitalize',
                      }}>
                        {title}
                      </Typography>
                      <Paper sx={{
                        width: '50px',
                        height: '2px',
                        // backgroundColor: 'black',
                        margin: '20px 0',
                        backgroundColor: 'purple'
                      }}
                        elevation={0} />
                      <Typography sx={{
                        fontSize: '13px',
                        fontFamily: 'Poppins',
                        textTransform: 'capitalize',
                        color: '#36454f',
                        fontWeight: '600'
                      }}>
                        {description}
                      </Typography>
                      {/* <Typography sx={{
                        fontSize: '12px',
                        fontFamily: 'Poppins',
                        textTransform: 'lowercase',
                        color: 'darkgray',
                        fontWeight: 'bold',
                        padding: '1rem 0',
                      }}>
                        {completed}
                      </Typography> */}
                    </Box>
                  </Button>
                </Grid>
              )
            })}
          </Grid>

        </Box>
      </Container>
    </>
  )
}

export default Users