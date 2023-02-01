import React from 'react';
import { IconButton } from '@mui/material';
import { Mic } from '@mui/icons-material';
import { MicOff } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { roomSelector } from 'redux/room/selector';

const MicButton = () => {
  const [micEnable, setMicEnable] = React.useState(true);
  const { localStream } = useSelector(roomSelector);

  const handleToggleMic = () => {
    localStream.getAudioTracks()[0].enabled = !micEnable;   
    setMicEnable(!micEnable);
  }
    
  return (
    <IconButton onClick={handleToggleMic} style={{color: 'white'}}>
        {micEnable ? <Mic/> : <MicOff />}
    </IconButton>
  )
}

export default MicButton