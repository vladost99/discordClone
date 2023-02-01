import React from 'react';
import DropdownMenu from './DropdownMenu';
import ChoosenOptionLabel from './ChoosenOptionLabel';
import { styled } from '@mui/system';
import { useSelector } from 'react-redux';
import { chatSelector } from 'redux/chat/selector';

const MainContainer = styled('div')({
  height: '48px',
  borderBottom: '1px solid black',
  backgroundColor: '#36393f',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const AppBar = () => {
  const { choosenChatDetails } = useSelector(chatSelector);

  return (
      <MainContainer>
        {choosenChatDetails &&  <ChoosenOptionLabel name={choosenChatDetails?.name} />}
        <DropdownMenu />
      </MainContainer>
  )
}

export default AppBar