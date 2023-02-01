import React from 'react';
import { styled } from '@mui/system';
import VideosContainer from './VideosContainer';
import RoomButtons from './RoomButtons';

const MainContainer = styled('div')({
    position: 'absolute',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#202225',
    zIndex: 999999
});


const fullScreen = {
    width: '100%',
    height: '100vh',

};

const minimizedRoomStyle = {
    bottom: '0px',
    right: '0px',
    width: '50%',
    height: '40vh'
}

const Room = () => {
  const [isRoomMinimized, setIsMinimized] = React.useState(true);

  const roomResizeHandler = () => {
    setIsMinimized(!isRoomMinimized);
  }

  return (
    <MainContainer style={isRoomMinimized ? minimizedRoomStyle : fullScreen}>
        <VideosContainer />
        <RoomButtons 
            isRoomMinimized={isRoomMinimized}
            roomResizeHandler={roomResizeHandler}
        />
    </MainContainer>
  )
}

export default Room