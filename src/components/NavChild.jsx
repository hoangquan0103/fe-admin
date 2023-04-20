import React from 'react';
import { Box, Card, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { nav } from '../utils/fakeData';
function NavChild() {
  const location = useLocation();
  const tmpUrl = '/' + location.pathname.split('/')[1];
  const url = tmpUrl === '/edit' ? tmpUrl : location.pathname;

  const data = nav.filter((item) => {
    return item.url == url;
  });

  return (
    <Box
      sx={{
        width: '100%',
        height: 70,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 2,
        borderColor: 'rgb(213,219,225)',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 3,
        marginTop: 9,
      }}
    >
      <Box
        sx={{
          width: 3,
          height: 30,
          marginRight: 3,
          background:
            'linear-gradient(180deg, rgba(1,227,167,1) 0%, rgba(9,9,121,1) 100%, rgba(40,0,128,1) 100%)',
        }}
      />
      <Typography fontFamily={'Roboto Slab'} fontSize={20} fontWeight={900}>
        {data[0]?.name}
      </Typography>
    </Box>
  );
}

export default NavChild;
