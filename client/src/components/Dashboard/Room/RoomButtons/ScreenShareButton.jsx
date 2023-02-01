import React from 'react';
import RoomHandlers from 'redux/room/handlers';
import { IconButton } from '@mui/material';
import { ScreenShare } from '@mui/icons-material';
import { StopScreenShare } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { roomSelector } from 'redux/room/selector';


const ScreenShareButton = () => {
  const [screenShareEnabled, setScreenShareEnabled] = React.useState(true);
  const { localStream, isScreenSharingActive, screenSharingStream } = useSelector(roomSelector);
  
  const handleToggleScreenShare = async () => {

    if(!isScreenSharingActive) {
      let stream = null;

      try {
        stream = await navigator.mediaDevices.getDisplayMedia({
          audio: false,
          video: true
        })
      }
      catch(err) {
        console.log(`error occured when trying to get an access to screen share`)
      }

      if(stream) {
        RoomHandlers.setScreenSharingStream(stream);
      }
    }
    else {
      RoomHandlers.setScreenSharingStream(null, localStream);
    }

    setScreenShareEnabled(!screenShareEnabled);
  }

  return (
    <IconButton style={{color: 'white'}} onClick={handleToggleScreenShare}>
        {screenShareEnabled ? <ScreenShare/> : <StopScreenShare/> }
    </IconButton>
  )
}

export default ScreenShareButton