import React from 'react'
import { useState } from 'react';
import { Box, MenuItem, Select } from '@mui/material';
import { BsChevronDown } from 'react-icons/bs'
import FormControl from '@mui/material/FormControl';




const SelectLang = () => {

  const [editorLanguage, setEditorLanguage] = useState("C");


  // const iconComponent = (props) => {
  //   return (
  //     <BsChevronDown className={props.className + " " + minimalSelectClasses.icon} />
  //   )
  // };

  // // moves the menu below the select input
  // const menuProps = {
  //   classes: {
  //     // paper: minimalSelectClasses.paper,
  //     // list: minimalSelectClasses.list
  //   },
  //   anchorOrigin: {
  //     vertical: "bottom",
  //     horizontal: "left"
  //   },
  //   transformOrigin: {
  //     vertical: "top",
  //     horizontal: "left"
  //   },
  //   getContentAnchorEl: null
  // };

  return (
    <section style={{
      flex: 1,
    }}>

      {/* languages */}
      <Box width='200px'>
        <FormControl fullWidth >
          <Select
            value={editorLanguage}
            IconComponent={BsChevronDown}
            // MenuProps={menuProps}
            inputProps={{ 'aria-label': 'Without label' }}
            onChange={e => setEditorLanguage(e.target.value)}
          >
            <MenuItem defaultValue value="C">C</MenuItem>
            <MenuItem value="JavaScript">JavaScript</MenuItem>
            <MenuItem value="Python">Python</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </section>
  )
}

export default SelectLang;