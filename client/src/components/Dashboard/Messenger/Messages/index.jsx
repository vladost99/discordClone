import React from "react";
import MessagesHeader from "./MessagesHeader";
import Message from "./Message";
import DateSeparator from "./DateSeparator";
import { styled } from "@mui/system";
import { useSelector } from "react-redux";
import { chatSelector } from "redux/chat/selector";
import { convertDateToHumanReadable } from "utils/date";

const MainContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const Messages = () => {
  const { choosenChatDetails, messages } = useSelector(chatSelector);
  const refMessages = React.useRef(null);


  React.useEffect(() => {
     const lastMessage = messages[messages.length - 1];
      if(lastMessage) {
        document.getElementById(lastMessage._id.toString()).scrollIntoView({block: 'end', behavior: 'smooth'});
      }
  }, [messages]);

  return (
    <MainContainer>
      <MessagesHeader name={choosenChatDetails?.name} />
      
        
        
            <div id="chat-messages" ref={refMessages} style={{ height: 'calc(100vh - 330px)', paddingBottom: '20px', overflow: 'auto', display: 'flex', flexDirection: 'column', width: '97%'}}>
                {messages.map((msg, msgInd) => {
            let sameAuthor =
              msgInd > 0 &&
              messages[msgInd].author._id === messages[msgInd - 1].author._id;

            let sameDay =
              msgInd > 0 &&
              convertDateToHumanReadable(new Date(msg.date), "dd/mm/yy") ===
                convertDateToHumanReadable(
                  new Date(messages[msgInd - 1].date),
                  "dd/mm/yy"
                );

            let date = convertDateToHumanReadable(new Date(msg.date), "dd/mm/yy");


            return (
              <div key={msg._id} id={msg._id.toString()} style={{width: '97%'}}>
                {(!sameDay || msgInd === 0) && (
                  <DateSeparator
                    date={convertDateToHumanReadable(new Date(msg.date), 'dd/mm/yy')}
                  />
                )}
                <Message
                  content={msg.content}
                  name={msg.author.name}
                  sameAuthor={sameAuthor}
                  date={date}
                  sameDay={sameDay}
                />
              </div>
            );
          })}
        </div>
      
      
    </MainContainer>
  );
};

export default Messages;
