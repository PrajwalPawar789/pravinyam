import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material'
import { useState } from 'react';
import ECards from './ECards';

const Search = () => {

  const [inputText, setInputText] = useState("");

  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
  return (
    <>
      <TextField
        onChange={inputHandler}
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
      <ECards input={inputText} />
    </>
  )
}

export default Search