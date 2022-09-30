import { Box, CircularProgress, Container, Paper, styled, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import ProgressBar from "../ProgressBar/ProgressBar"

const Item = styled(Paper)({
  width: '350px', height: 'auto',
  display: 'flex', alignItems: 'center', flexDirection: 'column',
  padding: '15px 25px',
  backgroundColor: '#7b1fa2',
  borderRadius: '10px',
  // margin: '10px',
})

const Paper1 = styled(Paper)({
  marginTop: '40px',
  // backgroundColor: '#cfe8fc',
  boxShadow: '8px 8px 10px rgba(220,220,220,0.8),-2px -2px 10px rgba(220,220,220,0.8)',
  padding: '10px 20px',
  borderRadius: '10px'
})

const Paper2 = styled(Paper)({
  width: '50%',
  textAlign: 'center',
  borderRadius: '0px',
})

const MyTypography = styled(Typography)({
  fontFamily: 'Poppins',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: 'white',
})

function CircularProgressWithLabel(props) {
  console.log("props", props);
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" thickness={8} value={props.value} size={230}
        sx={{
          position: 'relative',
          zIndex: 2,
          color: '#9966cc',
        }} />
      <CircularProgress variant="determinate" thickness={8} value={100} size={230}
        sx={{
          position: 'absolute',
          color: '#dcdcdc',
          zIndex: 1,
        }} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography sx={{
          fontFamily: 'Poppins',
          fontSize: '1.3rem',
          fontWeight: 600,
        }}>
          {`${props.value}%`}
        </Typography>
      </Box>
    </Box>
  );
}

const MyJourney = () => {

  const [tracksSubscribed, setTracksSubscribed] = useState([]);
  const [exerciseCompleted, setExerciseCompleted] = useState([]);
  const [totalExercises, setTotalExercises] = useState([]);
  const [dateEnrolled, setDateEnrolled] = useState([]);
  const [moduleProg, setModuleProg] = useState([]);


  useEffect(() => {
    getTracksEnrolled()
  }, [])


  function getTracksEnrolled() {
    const tracksSubsArr = axios.get("http://localhost:8090/api/userprogress/tracksSubscribed?userId=1")

    const exerciseCompArr = axios.get("http://localhost:8090/api/userprogress/exerciseCompleted?tracks=C&userId=1")

    const totalExercisesArr = axios.get("http://localhost:8090/api/exercises")

    const dateEnrolled = axios.get("http://localhost:8090/api/userprogress/dateEnrolled?tracks=C&userId=1");

    const moduleProgress = axios.get("http://localhost:8090/api/userprogress/moduleProgress?tracks=C&userId=1")

    axios.all([tracksSubsArr, exerciseCompArr, totalExercisesArr, dateEnrolled, moduleProgress]).then(
      axios.spread((...tracksData) => {
        const getTracksSubs = tracksData[0].data;
        const getExerciseComp = tracksData[1].data[0].exerciseCompleted;
        const getTotExercises = tracksData[2].data.length
        const getDateEnrolled = tracksData[3].data[0];
        const getModuleProgress = tracksData[4].data[0];

        setTracksSubscribed(getTracksSubs);
        setExerciseCompleted(getExerciseComp);
        setTotalExercises(getTotExercises);
        setDateEnrolled(getDateEnrolled)
        setModuleProg(getModuleProgress)

        // console.log("mymy", getModuleProgress);
      })
    )
  }


  return (
    <>
      <Container fixed sx={{
        height: '200vh',
      }}>
        <Typography sx={{
          textAlign: 'center',
          padding: '20px',
          fontSize: '3rem',
          fontWeight: 800,
          fontFamily: 'Poppins'
        }}>
          Your Learnings
        </Typography>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around'
        }}>
          <Item elevation={0}>
            <MyTypography>{tracksSubscribed.length}</MyTypography>
            <MyTypography>Tracks Enrolled</MyTypography>
          </Item>
          <Item elevation={0}>
            <MyTypography>{exerciseCompleted}</MyTypography>
            <MyTypography>Exercise Completed</MyTypography>
          </Item>
          <Item elevation={0} >
            <MyTypography>2</MyTypography>
            <MyTypography>Concepts Learned</MyTypography>
          </Item>
        </Box>
        <Paper1 elevation={0}>
          <Typography sx={{
            fontSize: '1.2rem',
            fontWeight: 800,
            padding: '5px 0px',
            fontFamily: 'Poppins',
          }}>You're <span style={{ color: '#9966cc', fontSize: '20px' }}>{Math.round(((exerciseCompleted / totalExercises) * 100) * 10) / 10}%</span> through your enrolled tracks
          </Typography>
          <ProgressBar progress={Math.round(((exerciseCompleted / totalExercises) * 100) * 10) / 10} />
          <Typography sx={{
            fontSize: '1.2rem',
            padding: '5px 0px',
            fontWeight: 500,
            fontFamily: 'Poppins',
          }}>{exerciseCompleted} / {totalExercises} exercises completed</Typography>
        </Paper1>
        <Paper1 >
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid #dcdcdc',
            paddingBottom: '5px'
          }}>
            <Typography sx={{
              marginRight: '10px',
              fontSize: '1.2rem',
              fontWeight: 800,
              fontFamily: 'Poppins',
            }}>JavaScript</Typography>
            <ProgressBar progress={Math.round(((exerciseCompleted / totalExercises) * 100) * 10) / 10} />
            <Typography sx={{
              fontSize: '1.2rem',
              fontWeight: 800,
              padding: '5px 0px',
              color: '#9966cc', fontSize: '20px',
              marginLeft: '10px',
              fontFamily: 'Poppins',
            }}>{Math.round(((exerciseCompleted / totalExercises) * 100) * 10) / 10}%
            </Typography>
          </Box>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '15px',
          }}>
            <Paper2 elevation={0} sx={{
              borderRight: '1px solid #dcdcdc',
            }}>
              <Typography sx={{
                fontSize: '1.2rem',
                fontWeight: 800,
                fontFamily: 'Poppins',
              }}>Last 14 days</Typography>
              <Typography sx={{
                fontSize: '1.2rem',
                padding: '5px 0px',
                fontWeight: 500,
                textAlign: 'center',
                fontFamily: 'Poppins',
              }}>{exerciseCompleted} / {totalExercises} exercises completed</Typography>
            </Paper2>
            <Paper2 elevation={0} sx={{
              borderLeft: '1px solid #dcdcdc',
            }}>
              <Typography sx={{
                fontSize: '1.2rem',
                fontWeight: 800,
              }}>Date Enrolled</Typography>
              <Typography sx={{
                fontSize: '1.2rem',
                padding: '5px 0px',
                fontWeight: 500,
                fontFamily: 'Poppins',
              }}>{dateEnrolled.dateEnrolled}</Typography>
            </Paper2>
          </Box>
        </Paper1>


        <Typography sx={{
          textAlign: 'center',
          padding: '20px',
          fontSize: '3rem',
          fontWeight: 800,
          marginTop: '10px',
          fontFamily: 'Poppins',
        }}>
          Progress Per Module
        </Typography>

        <Paper sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly'
        }} elevation={0}>
          <Paper1>
            <Typography sx={{
              fontWeight: 800,
              fontSize: '1.6rem',
              fontFamily: 'Poppins',
              margin: '20px 10px',
            }}>Code Reading</Typography>
            <Paper sx={{
              width: '50px',
              height: '2px',
              // backgroundColor: 'black',
              margin: '20px 10px',
              backgroundColor: '#9966cc'
            }}
              elevation={0} />
            <CircularProgressWithLabel value={moduleProg.readerPerc == null ? 0 : moduleProg.readerPerc} />
          </Paper1>
          <Paper1>
            <Typography sx={{
              fontWeight: 800,
              fontSize: '1.6rem',
              fontFamily: 'Poppins',
              margin: '20px 10px',
            }}>Debugging Skills</Typography>
            <Paper sx={{
              width: '50px',
              height: '2px',
              // backgroundColor: 'black',
              margin: '20px 10px',
              backgroundColor: '#9966cc'
            }}
              elevation={0} />
            <CircularProgressWithLabel value={moduleProg.debugPerc == null ? 0 : moduleProg.debugPerc} />
          </Paper1>
          <Paper1>
            <Typography sx={{
              fontWeight: 800,
              fontSize: '1.6rem',
              fontFamily: 'Poppins',
              margin: '20px 10px',
            }}>Problem Solving</Typography>
            <Paper sx={{
              width: '50px',
              height: '2px',
              // backgroundColor: 'black',
              margin: '20px 10px',
              backgroundColor: '#9966cc'
            }}
              elevation={0} />
            <CircularProgressWithLabel value={moduleProg.solverPerc == null ? 0 : moduleProg.solverPerc} />
          </Paper1>
        </Paper>
      </Container>
    </>
  )
}

export default MyJourney