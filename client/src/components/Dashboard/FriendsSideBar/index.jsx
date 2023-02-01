import React from "react";
import AddFriendButton from "./AddFriendButton";
import FriendsTitle from "./FriendsTitle";
import FriendsList from "./FriendsList";
import PendingInvitationsList from "./PendingInvitationsList";
import { styled } from "@mui/system";

const MainContainer = styled("div")({
  width: "350px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#2F3136",
});

const FriendsSiderBar = () => {
  return (
    <MainContainer>
      <AddFriendButton />
      <FriendsTitle title='Private Messages' />
      <FriendsList />
      <FriendsTitle title='Invitations' />
      <PendingInvitationsList />
    </MainContainer>
  );
};

export default FriendsSiderBar;
