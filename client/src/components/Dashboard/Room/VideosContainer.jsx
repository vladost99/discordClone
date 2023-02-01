import React from 'react';
import Video from './Video';
import { styled } from '@mui/system';
import { useSelector } from 'react-redux';
import { roomSelector } from 'redux/room/selector';

const MainContainer = styled('div')({
    height: '85%',
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap'
});

const VideosContainer = () => {
  const { localStream, remoteStreams, screenSharingStream } = useSelector(roomSelector);
  return (
    <MainContainer>
      <Video stream={screenSharingStream ? screenSharingStream : localStream} isLocalStream />
      {remoteStreams.map(stream => (
        <Video stream={stream} key={stream.id} />
      ))}
    </MainContainer>
  )
}

export default VideosContainer