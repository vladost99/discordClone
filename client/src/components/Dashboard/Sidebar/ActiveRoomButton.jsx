import Avatar from 'components/Avatar';
import React from 'react';
import RoomHandlers from 'redux/room/handlers';
import { Button, Tooltip } from '@mui/material';


const ActiveRoomButton = ({ creatorUserName, roomId, amountOfParticipants, isUserInRoom }) => {


  const handleJoinActiveRoom = () => {
    if(amountOfParticipants < 4) {
        RoomHandlers.prepareJoin(roomId);
    }
  }
  
  const activeRoomButtonDisabled  = isUserInRoom || amountOfParticipants > 3;
  const roomTitle = `Creator: ${creatorUserName}. Connected: ${amountOfParticipants}`;


  return (
   <Tooltip title={roomTitle}>
    <div>
      <Button
        disabled={activeRoomButtonDisabled}
        onClick={handleJoinActiveRoom}
      >
          <Avatar name={creatorUserName} />
      </Button>
    </div>
   </Tooltip>
  )
}

export default ActiveRoomButton