import { Container, InputAdornment, TextField, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import ExerciseCards from '../ExerciseCards/ExerciseCards'
import ECards from '../ExerciseCards/ECards';


const Exercise = () => {

  return (
    <Container maxWidth="100%" sx={{
      padding: '0 1rem',
      marginTop: '0px'
    }}>
      <Typography sx={{
        marginTop: '1rem',
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        fontSize: '2rem',
      }}>
        Problem solving examples
      </Typography>
      <Typography sx={{
        marginTop: '1rem',
        fontFamily: 'Poppins',
        fontSize: '1rem',
        fontWeight: '500',
      }}>
        Unlock more exercises as you progress. They are great practice and fun to code.
      </Typography>
      <ECards />
    </Container>
  )
}

export default Exercise