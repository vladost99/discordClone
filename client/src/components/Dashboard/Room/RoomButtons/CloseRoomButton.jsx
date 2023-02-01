import React from 'react';
import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import RoomHandlers from 'redux/room/handlers';

const CloseRoomButton = () => {

  
  const handleLeaveRoom = () => {
      RoomHandlers.leave();
  }

  return (
    <IconButton style={{color: 'white'}} onClick={handleLeaveRoom}>
       <Close/>
    </IconButton>
  )
}

export default CloseRoomButton