import styled from '@emotion/styled';
import React from 'react';
import { Typography } from '@mui/material';

const RedirectText = styled('span')({
    color: '#00AFF4',
    fontWeight: 500,
    cursor: 'pointer',
    marginLeft: '5px'
});

const RedirectInfo = ({ text, redirectText, additionalStyles, redirectHandler }) => {
  return (
    <Typography 
     variant='subtitle2'
     style={additionalStyles ? additionalStyles : {}}
     sx={{ color: '#72767d' }}
     >
        {text}
        <RedirectText onClick={redirectHandler}>{redirectText}</RedirectText>
    </Typography>
  )
}

export default RedirectInfo