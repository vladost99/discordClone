import React from "react";
import MainPageButton from "../MainPageButton";
import CreateRoomButton from "./CreateRoomButton";
import ActiveRoomButton from "./ActiveRoomButton";
import { styled } from "@mui/system";
import { useSelector } from "react-redux";
import { roomSelector } from "redux/room/selector";

const MainContainer = styled("div")({
  width: "72px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#202225",
});

const Sidebar = () => {
  const { activeRooms, isUserInRoom } = useSelector(roomSelector);

  return (
    <MainContainer>
      <MainPageButton />
      <CreateRoomButton isUserInRoom={isUserInRoom} />
      {activeRooms.map(room => {
        return (
          <ActiveRoomButton
            roomId={room.roomId}
            creatorUserName={room.creatorUserName}
            amountOfParticipants={room.participants.length}
            key={room.roomId}
            isUserInRoom={isUserInRoom}
          />
        )
      })}
    </MainContainer>
  );
};

export default Sidebar;
