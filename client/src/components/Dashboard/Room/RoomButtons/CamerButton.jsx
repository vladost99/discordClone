import React from 'react';
import { IconButton } from '@mui/material';
import { Videocam } from '@mui/icons-material';
import { VideocamOff } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { roomSelector } from 'redux/room/selector';


const CamerButton = () => {
  const [cameraEnable, setCameraEnabled] = React.useState(true);
  const { localStream } = useSelector(roomSelector);
  

  const handleToggleCamera = () => {
    localStream.getVideoTracks()[0].enabled = !cameraEnable;
    setCameraEnabled(!cameraEnable);
  }

  return (
    <IconButton style={{color: 'white'}} onClick={handleToggleCamera}>
        {cameraEnable ? <Videocam/> : <VideocamOff/> }
    </IconButton>
  )
}

export default CamerButton