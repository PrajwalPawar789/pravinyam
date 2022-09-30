import { Box, Typography, Stack } from '@mui/material';
// import { Edata as data } from '../Pages/data';
import React from 'react'
import Icon from '@mui/material/Icon';

const colors = ['#0a2351', 'green', '#72A0C1', '#A9A9A9'];

const ExerciseCards = (props) => {
  console.warn("123", props);
  return (
    <>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        marginTop: '15px',
      }}>
        {data.map(({ label, icons }, index) => {
          return (
            <Stack direction="row" alignItems="center" key={label} sx={{
              marginRight: '3rem',
            }}>
              <Icon fontSize="small" sx={{
                display: 'flex',
                alignItems: 'center',
                marginRight: '10px',
                color: colors[index],
              }}>
                {icons}
              </Icon>
              <Typography sx={{
                fontSize: '15px',
                fontFamily: 'Poppins',
                marginRight: '10px'
              }}>
                {label}
              </Typography>
              <Typography sx={{
                fontSize: '15px',
                fontFamily: 'Poppins',
                marginRight: '10px',
                color: '#A9A9A9'
              }}>
                {props.reader ? props.reader.lenght : props.debug ? props.debug.length : props.solver.length}
              </Typography>
            </Stack>
          );
        })}
      </Box>
    </>
  )
}

export default ExerciseCards;