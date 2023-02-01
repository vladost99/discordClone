import React from 'react';
import ArrowBack from '@mui/icons-material/ArrowBack'
import { Typography } from '@mui/material';
import ChatHandlers from 'redux/chat/handlers';

const ChoosenOptionLabel = ({ name }) => {

  const leave = () => {
    ChatHandlers.leaveConversation();
  }

  return (
    <Typography
        sx={{fontSize: '16px', color: 'white', fontWeight: 'bold', marginLeft: '10px', display: 'flex', 'alignItems': 'center'}}
    >
      <ArrowBack onClick={leave}  style={{marginRight: '15px', cursor: 'pointer'}}/>  { name ? `Choosen conversation: ${name}` : ''}
    </Typography>
  )
}

export default ChoosenOptionLabel