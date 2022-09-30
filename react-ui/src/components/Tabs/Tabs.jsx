import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import data from './Data'
import { Link, useLocation } from 'react-router-dom';


const ComponentTab = () => {

  const location = useLocation();

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={location.pathname} textColor="secondary"
        indicatorColor="secondary">
        {data.map((item, index) => {
          return (
            <Tab
              key={index}
              value={item.link}
              component={Link}
              label={item.label}
              to={item.link} sx={{
                borderRight: 2,
                borderColor: 'divider',
                textTransform: 'capitalize',
                fontSize: '1rem',
                fontFamily: 'Poppins',
              }} />
          );
        })}
      </Tabs>
    </Box>

  );
}

export default ComponentTab;