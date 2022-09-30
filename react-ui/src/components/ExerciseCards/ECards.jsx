import { Box, Button, Card, CardContent, CardMedia, Grid, Icon, styled, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CardActionArea } from '@mui/material';
import pan from '../../assets/pan1.png';
import { GrNext } from 'react-icons/gr'
import ExerciseCards from './ExerciseCards';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material'
import { useEffect } from 'react';

import './ECards.css';




const Basics = function basis(props) {
  console.log(props);
  // if (props.description.length >= 90) {
  return (
    <Box sx={{
      width: '20rem',
      height: '5rem'
    }}>
      <Typography
        sx={{
          fontFamily: 'Poppins',
          fontWeight: '500',
          fontSize: '18px',
          textAlign: 'start',
        }}>
        {`${props.subcategory} ${props.exid.replace(/[^0-9.]/g, "")}`}
      </Typography>
      <Box sx={{
        // backgroundColor: 'red',
        display: 'flex',
        alignItems: 'center',
        marginTop: '3px',
        marginBottom: '3px',
      }}>
        <Typography sx={{
          marginRight: '10px',
        }}>
          {
            props.level <= 3 ?
              <Typography
                sx={{
                  padding: '2px 10px',
                  fontWeight: '500',
                  fontFamily: 'Poppins',
                  // backgroundColor: '#90EE90',
                  // color: '#228b22',
                  border: '1px solid #29ab87',
                  backgroundColor: '#d0f0c0',
                  color: '#29ab87',
                  borderRadius: '10px',
                  fontSize: '13px',
                }}>Easy</Typography>
              : props.level > 3 && props.level <= 6 ?
                <Typography
                  sx={{
                    border: '1px solid #FF6700',
                    padding: '2px 10px',
                    fontWeight: '500',
                    fontFamily: 'Poppins',
                    backgroundColor: '#ffe5b4',
                    color: '#FF6700',
                    borderRadius: '10px',
                    fontSize: '13px',
                  }}>Medium</Typography>
                : props.level > 6 ?
                  <Typography
                    sx={{
                      border: '1px solid #800000',
                      padding: '2px 10px',
                      fontWeight: '500',
                      fontFamily: 'Poppins',
                      backgroundColor: '#fbceb1',
                      color: '#800000',
                      borderRadius: '10px',
                      fontSize: '13px',
                    }}>Hard</Typography>
                  : <Typography
                    sx={{
                      padding: '2px 10px',
                      fontWeight: '500',
                      fontFamily: 'Poppins',
                      // backgroundColor: '#90EE90',
                      // color: '#228b22',
                      border: '1px solid #29ab87',
                      backgroundColor: '#d0f0c0',
                      color: '#29ab87',
                      borderRadius: '10px',
                      fontSize: '13px',
                    }}>Easy</Typography>
          }
        </Typography>
        <Typography sx={{
          fontSize: '14px',
          fontWeight: '500',
          fontFamily: 'Poppins',
          padding: '2px 10px',
          border: '1px solid black',
          borderRadius: 50,
        }}>
          {props.subcategory}
        </Typography>
      </Box>
      <Typography
        sx={{
          fontSize: '12px',
          fontFamily: 'Poppins',
          maxWidth: '20rem',
          fontWeight: '500',
          textAlign: 'start',
        }}>
        {props.description.length >= 90 ? `${props.description.substring(0, 90)}...` : props.description}
      </Typography>
    </Box>
  )
}


const ECards = (props) => {

  let debug = props.debug;
  let reader = props.reader;
  let solver = props.solver;
  // console.warn(debug);
  // console.warn(reader);
  // console.warn(solver);

  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [exercises, setExercises] = useState([]);



  useEffect(() => {
    getExercises();
  }, [])

  function getExercises() {
    fetch("http://localhost:8090/api/exercises")
      .then((result => {
        result.json().then((res) => {
          // console.log(res);
          setExercises(res)
        })
      }))
  }


  const MyButton = styled(Button)({
    marginLeft: '3rem',

    borderRadius: '10px',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
    padding: '0px',
    "&:hover": {
      boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 8px, rgba(0, 0, 0, 0.23) 0px 3px 8px',
      backgroundColor: '#f5f5f5',
    },
  })

  function toEditor(exercises) {
    navigate('/editor', { state: exercises })
  }

  return (
    <>
      <TextField
        onChange={e => setQuery(e.target.value)}
        color="secondary"
        focused
        sx={{
          width: '40%',
          margin: '1.5rem 0',
          '& .MuiOutlinedInput-root': {
            borderRadius: 10
          },
          '& input::placeholder': {
            fontWeight: 'semi-bold',
            color: 'black',
            fontFamily: 'Poppins',
          },
        }}
        placeholder='Search by Title'
        InputProps={{
          style: { fontSize: 20 },
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="large" color="secondary" sx={{
                marginRight: '5px',
              }} />
            </InputAdornment>
          ),
        }}
        size="large" variant="outlined" type="search" />
      <ExerciseCards />
      <Box sx={{
        width: '100%',
        height: 'auto',
        backgroundColor: '#f5f5f5',
        marginTop: '1.5rem',
        marginBottom: '10rem',
        padding: '1rem 1.5rem',

      }}>
        <Grid container>
          {
            reader.filter(item => item.title.toLowerCase().includes(query))
            || solver.filter(item => item.title.toLowerCase().includes(query))
            || debug.filter(item => item.title.toLowerCase().includes(query))
              .map((prop) => {
                return (
                  <Grid item xs={6} key={prop.exid} >
                    <Box sx={{
                      padding: '1rem 0rem',
                    }}>
                      <MyButton
                        onClick={() => toEditor(prop)}
                        disableRipple={true}
                        disabled={prop.level > 6}
                      // className="Button"
                      // sx={{
                      //   marginLeft: '3rem',

                      //   borderRadius: '10px',
                      //   boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                      //   padding: '0px',
                      //   "&:hover": {
                      //     boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 8px, rgba(0, 0, 0, 0.23) 0px 3px 8px',
                      //     backgroundColor: '#f5f5f5',
                      //   },
                      //   "&:disabled": {
                      //     fontFamily: 'Source code pro'
                      //   }
                      // }}
                      >
                        <Card elevation={0}>
                          {/* image */}
                          <CardActionArea sx={{
                            display: 'flex',
                            justifyContent: 'left',
                            alignItems: 'center',
                          }}>
                            <Box>
                              <CardMedia
                                component="img"
                                image={pan}
                                alt="green iguana"
                                sx={{
                                  width: 70,
                                  height: 70,
                                  margin: '1rem',
                                  borderRadius: '50%',
                                  backgroundColor: '#9966cc'
                                }}
                              />
                            </Box>
                            <Box>
                              <CardContent>
                                {
                                  // (prop.category === 'Basics' && 
                                  <Basics title={prop.title} description={prop.description} level={parseInt(prop.level)} subcategory={prop.subctegoryid} exid={prop.exid} category={prop.category} />
                                  // )
                                  // ||
                                  // (prop.category === 'Conditional statements' && <Conditional title={prop.title} description={prop.description} level={parseInt(prop.level)} subcategory={prop.subctegoryid} exid={prop.exid} category={prop.category} />)
                                  // ||
                                  // (prop.category === 'Strings' && <Strings title={prop.title} description={prop.description} level={parseInt(prop.level)} subcategory={prop.subctegoryid} exid={prop.exid} category={prop.category} />)
                                  // ||
                                  // (prop.category === 'Loops' && <Loops title={prop.title} description={prop.description} level={parseInt(prop.level)} subcategory={prop.subctegoryid} exid={prop.exid} category={prop.category} />)
                                  // ||
                                  // (prop.category === 'Arrays' && <Arrays title={prop.title} description={prop.description} level={parseInt(prop.level)} subcategory={prop.subctegoryid} exid={prop.exid} category={prop.category} />)
                                }
                              </CardContent>
                            </Box>
                            <Box sx={{
                              width: '70px',
                              margin: '0px'
                            }}>
                              <Icon><GrNext /></Icon>
                            </Box>
                          </CardActionArea>
                        </Card>
                      </MyButton>
                    </Box>
                  </Grid>
                );
              })}
        </Grid>
      </Box>
    </>
  )
}

export default ECards;