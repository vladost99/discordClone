import React from 'react';
import { CloseFullscreen } from '@mui/icons-material';
import { OpenInFull } from '@mui/icons-material';
import { styled } from '@mui/system';
import { IconButton } from '@mui/material';

const MainContainer = styled('div')({
    position: 'absolute',
    bottom: '5px',
    right: '10px',
})


const ResizeRoomButton = ({ isRoomMinimized, handleRoomResize }) => {
  return (
    <MainContainer>
        <IconButton style={{color: 'white'}} onClick={handleRoomResize}>
            {isRoomMinimized ? <OpenInFull/> : <CloseFullscreen />}
        </IconButton>
    </MainContainer>
  )
}

export default ResizeRoomButton