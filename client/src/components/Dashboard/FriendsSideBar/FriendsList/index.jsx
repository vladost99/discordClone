import React from 'react';
import FriendListItem from './FriendListItem';
import { styled } from '@mui/material';
import { useSelector } from 'react-redux';
import { friendsSelector } from 'redux/friends/selector';


const MainContainer = styled('div')({
  flexGrow: 1,
  width: '100%',
  height: '78%',
  overflowY: 'auto'
});



const FriendsList = () => {
  const { friends, onlineUsers } = useSelector(friendsSelector);

  const checkOnlineUsers = (friends = [], onlineUsers = []) => {
    
   let mapFriends =  friends.map(friend => {
       const isUserOnline = onlineUsers.find(u => u.userId === friend.id);
       return {...friend, isOnline:  isUserOnline ? true : false};
    })
  
    return mapFriends;
  }

  return (
    <MainContainer>
      {checkOnlineUsers(friends, onlineUsers).map(friend => (
        <FriendListItem key={friend.id} id={friend.id} name={friend.name} isOnline={friend.isOnline} />
      ))}
    </MainContainer>
  )
}

export default FriendsList