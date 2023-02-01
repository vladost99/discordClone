import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RoomHandlers from 'redux/room/handlers';
import { logout } from 'redux/user/thunk';
import { useDispatch, useSelector } from 'react-redux';
import { roomSelector } from 'redux/room/selector';

const DropdownMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { audioOnly, isUserInRoom } = useSelector(roomSelector);
  const open = Boolean(anchorEl);


  const dispatch = useDispatch();

  const handleMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  }

  const handleAudioOnlyChange = () => {
    RoomHandlers.setAudio(!audioOnly);
  }
  
  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <div>
       <IconButton style={{color: 'white'}} onClick={handleMenuOpen} ><MoreVertIcon/></IconButton>
       <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
        }}
      >
         <MenuItem disabled={isUserInRoom} onClick={() => dispatch(logout())}>
            Logout
         </MenuItem>
         <MenuItem onClick={handleAudioOnlyChange}>
            {audioOnly ? 'Audio Only Enabled' : 'Audio Only Disabled'}
         </MenuItem>
      </Menu>
    </div>
  )
}

export default DropdownMenu