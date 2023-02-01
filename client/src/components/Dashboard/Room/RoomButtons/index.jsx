import React from 'react';
import ScreenShareButton from './ScreenShareButton';
import MicButton from './MicButton';
import CloseRoomButton from './CloseRoomButton';
import CamerButton from './CamerButton';
import ResizeRoomButton from '.././ResizeRoomButton';
import { styled } from '@mui/system';
import { useSelector } from 'react-redux';
import { roomSelector } from 'redux/room/selector';

const MainContainer = styled('div')({
    height: '15%',
    width: '100%',
    backgroundColor: '#5865f2',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
})

const RoomButtons = ({isRoomMinimized, roomResizeHandler}) => {
  const { isUserJoinedWithOnlyAudio } = useSelector(roomSelector);

  return (
    <MainContainer>
       {!isUserJoinedWithOnlyAudio && <ScreenShareButton />}
        <MicButton />
        <CloseRoomButton />
        {!isUserJoinedWithOnlyAudio && <CamerButton />}
        <ResizeRoomButton
            isRoomMinimized={isRoomMinimized}
            handleRoomResize={roomResizeHandler}
        />
    </MainContainer>
  )
}

export default RoomButtons