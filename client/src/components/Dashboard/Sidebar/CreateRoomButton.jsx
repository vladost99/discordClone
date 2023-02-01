import React from 'react';
import RoomHandlers from 'redux/room/handlers';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';

const CreateRoomButton = ({isUserInRoom}) => {

    const createNewRoomHandler = () => {
        RoomHandlers.prepareCreateRoom();
    }

  return (
        <Button
           disabled={isUserInRoom} 
           style={{
            width: '48px',
            height: '48px',
            borderRadius: '16px',
            margin: 0,
            padding: 0,
            minWidth: 0,
            marginTop: '10px',
            color: 'white',
            backgroundColor: '#5865F2'
           }}
           onClick={createNewRoomHandler}
        >
            <AddIcon />
        </Button>
  )
}

export default CreateRoomButton