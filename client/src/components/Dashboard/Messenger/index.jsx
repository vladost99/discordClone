import React from "react";
import WelcomeMessage from './WelcomeMessage';
import MessengerContent from './MessengerContent';
import AppBar from "components/Dashboard/AppBar";
import { styled } from "@mui/system";
import { useSelector } from "react-redux";
import { chatSelector } from "redux/chat/selector";


const MainContainer = styled("div")({
  flexGrow: 1,
  backgroundColor: "#36393f",
  display: "flex",
});

const Messenger = () => {
  const { choosenChatDetails } = useSelector(chatSelector);

  return (
    <div style={{display: 'flex', 'flexDirection': 'column', width: '100%'}}>
        <AppBar/>
        <MainContainer>
      {!choosenChatDetails ? (
        <WelcomeMessage />
      ) : (
        <MessengerContent choosenChatDetails={choosenChatDetails}/>
      )}
    </MainContainer>
    </div>
  );
};

export default Messenger;
