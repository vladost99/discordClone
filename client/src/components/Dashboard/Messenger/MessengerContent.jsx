import React from 'react';
import Messages from './Messages';
import NewMessageInput from './NewMessageInput';
import ChatHandlers from 'redux/chat/handlers';
import { styled } from '@mui/system';


const Wrapper = styled('div')({
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
})

const MessengerContent = ({choosenChatDetails}) => {

 React.useEffect(() => {
    ChatHandlers.setActiveAndGetHistory(choosenChatDetails.id);
 }, [choosenChatDetails]);   

  return (
    <Wrapper>
        <Messages />
        <NewMessageInput />
    </Wrapper>
  )
}

export default MessengerContent