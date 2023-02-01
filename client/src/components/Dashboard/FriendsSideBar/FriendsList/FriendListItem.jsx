import React from "react";
import Avatar from "components/Avatar";
import OnlineIndicator from "./OnlineIndicator";
import UnreadBadge from "./UnreadBadge";
import ChatHandlers from 'redux/chat/handlers';
import { Button, Typography } from "@mui/material";
import { chatType } from "redux/chat/types";
import { useSelector } from "react-redux";
import { chatSelector } from "redux/chat/selector";

const FriendListItem = ({ name, isOnline, id }) => {

  const { counters } = useSelector(chatSelector);

  const handleChooseActiveConversation = () => {
    ChatHandlers.setActiveConversation({
      chatDetails: { id, name },
      chatType: chatType.direct,
    })
  };

  return (
    <Button
      onClick={handleChooseActiveConversation}
      style={{
        width: "100%",
        height: "42px",
        marginTop: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        textTransform: "none",
        color: "black",
        position: "relative",
      }}
    >
      <span style={{ display: "flex", alignItems: "center" }}>
        <Avatar name={name} />
        <Typography
          style={{
            marginLeft: "7px",
            fontWeight: 700,
            color: "#8e9297",
          }}
          variant="subtitle1"
          align="left"
        >
          {name}
        </Typography>
      </span>
      <span style={{ display: "flex", alignItems: "center" }}>
        {isOnline && <OnlineIndicator />}
        {counters && counters[id] && counters[id] > 0 ? <UnreadBadge count={counters[id]} /> : ''}
      </span>
    </Button>
  );
};

export default FriendListItem;
