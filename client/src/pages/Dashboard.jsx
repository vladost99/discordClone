import React from 'react';
import Sidebar from 'components/Dashboard/Sidebar';
import FriendsSiderBar from 'components/Dashboard/FriendsSideBar';
import Messenger from 'components/Dashboard/Messenger';
import Room from 'components/Dashboard/Room';
import socket from 'socket';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userSelector } from 'redux/user/selector';
import { roomSelector } from 'redux/room/selector';

const Wrapper = styled('div')({
  width: '100%',
  height: '100vh',
  display: 'flex'
})

const Dashboard = () => {
  const navigate = useNavigate();
  const {userDetails, token} = useSelector(userSelector);
  const { isUserInRoom } = useSelector(roomSelector);
  const [socketConnect, setSocketConnect] = React.useState(false);


  React.useEffect(() => {
     if(!token && !userDetails) {
      navigate('/login');
     }

     if(token && userDetails && socketConnect === false) {
      socket.connectWithSocketServer(userDetails);
      setSocketConnect(true);
    }
    
  }, [userDetails, token]);



  return (
      <Wrapper>
        <Sidebar />
        <FriendsSiderBar />
        <Messenger />
        {isUserInRoom && <Room />}
      </Wrapper>
  )
}

export default Dashboard