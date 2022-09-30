import React from 'react'
import { useState } from "react";
import './Users.css';
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
      <Container maxWidth="100%" className='main-container'>
        <div className='main-div'>
          <Typography id='typography-1'>
            Welcome back user 1,you are on the right place.
          </Typography>

          {/* users */}
          <div className='div-1'>
            {/* tracks */}
            <Typography id='typography-2'>
              Tracks
            </Typography>


            <SelectLang />

            {/* checkpoint */}
            <Button id='button-1'>
              <Typography id='typography-3' variant="inherit">
                Take me where I left
              </Typography>
            </Button>
          </div>

          <Grid className='grid-1' container >
            {modules.map(({ title, description, module, moduleid }) => {
              return (
                <Grid item key={moduleid}>
                  <Button id='button-1' component={Link} to={module} disableRipple >
                    <Box id='box-1' >
                      <Typography id='typography-1'>
                        {title}
                      </Typography>
                      <Paper id='paper-1'
                        elevation={0} />
                      <Typography id='typography-2' >
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

        </div>
      </Container>
    </>
  )
}

export default Users