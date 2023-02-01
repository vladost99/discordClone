import React from "react";
import ChatHandlers from 'redux/chat/handlers';
import { useSelector } from "react-redux";
import { chatSelector } from "redux/chat/selector";
import { styled } from "@mui/system";

const MainContainer = styled("div")({
  height: "60px",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Input = styled("input")({
  backgroundColor: "#2f3136",
  width: "96%",
  height: '98%',
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "14px",
  padding: "0 10px",
});

const NewMessageInput = () => {
  const { choosenChatDetails } = useSelector(chatSelector);
  const [message, setMessage] = React.useState("");

  const handleMessageValueOnChange = (e) => {
    setMessage(e.target.value);
  }

  const handleMessageKeyPressed = (e) => {
    if(e.key === 'Enter') {
      handleSendMessage();
    }
  }

  const handleSendMessage = () => {
    
    if(message.length > 0) {
      ChatHandlers.sendMessage({
        receiverUserId: choosenChatDetails.id,
        content: message
      })
      setMessage('');
    }
  }

  return (
    <MainContainer>
      <Input
        value={message}
        onChange={handleMessageValueOnChange}
        onKeyDown={handleMessageKeyPressed}
        placeholder={`Write message to ${choosenChatDetails.name}`}
      />
    </MainContainer>
  );
};

export default NewMessageInput;
