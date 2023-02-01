import React from 'react';
import { styled } from '@mui/system';


const MainContainer = styled('div')({
    width: '50%',
    height: '50%',
    backgroundColor: 'black',
    borderRadius: '8px'
});

const VideoEl = styled('video')({
    width: '100%',
    height: '100%'
});

const Video = ({ stream, isLocalStream }) => {
  const videoRef = React.useRef();
  
  React.useEffect(() => {
    const video = videoRef.current;
    if(stream) {
        video.srcObject = stream;

        video.onloadedmetadata = () => {
            video.play();
        }
    }
    else {
        video.srcObject = null;
        video.src = null;
    }    
  },[stream]);

  return (
    <MainContainer>
       {stream && <VideoEl ref={videoRef} autoPlay muted={isLocalStream ? true : false} />}
    </MainContainer>
  )
}

export default Video