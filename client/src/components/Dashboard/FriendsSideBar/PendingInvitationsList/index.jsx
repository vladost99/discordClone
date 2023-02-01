import React from 'react';
import PendingInvitationListItem from './PendingInvitationListItem';
import { styled } from '@mui/material';
import { useSelector } from 'react-redux';
import { friendsSelector } from 'redux/friends/selector';


const MainContainer = styled('div')({
  width: '100%',
  height: '22%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
});



const PendingInvitationsList = () => {
  const { pendingFriendsInvitations } = useSelector(friendsSelector);


  return (
    <MainContainer>
      {pendingFriendsInvitations.map(inv => (
        <PendingInvitationListItem
          key={inv._id}
          id={inv._id}
          name={inv.senderId.name}
          mail={inv.senderId.mail}
        />
      ))}
    </MainContainer>
  )
}

export default PendingInvitationsList