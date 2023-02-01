import Box from '@mui/material/Box';
import Avatar from "components/Avatar";
import InvitationDecisionButtons from "./InvitationDecisionButtons";
import React from "react";
import { Tooltip, Typography } from "@mui/material";
import { useDispatch } from 'react-redux';
import { rejectInvite, acceptInvite } from 'redux/friends/thunk';

const PendingInvitationListItem = ({
  name,
  mail,
  id,
}) => {
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const dispatch = useDispatch();

  const handleAcceptInvitation = () => {
    dispatch(acceptInvite({inviteId: id}))
    setButtonDisabled(true);
  };

  const handleRejectInvitation = () => {
    dispatch(rejectInvite({inviteId: id}));
    setButtonDisabled(true);
  };

  return (
    <Tooltip title={mail}>
      <div style={{ width: "100%" }}>
        <Box
          sx={{
            width: "100%",
            height: "42px",
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Avatar name={name} />
          <Typography
            sx={{
              marginLeft: "7px",
              fontWeight: 700,
              color: "#8e9297",
              flexGrow: 1,
            }}
            variant="subtitle1"
          >
            {name}
          </Typography>
          <InvitationDecisionButtons
            disabled={buttonDisabled}
            acceptInvitationHandler={handleAcceptInvitation}
            rejectInvitationHandler={handleRejectInvitation}
        />
        </Box>
      </div>
    </Tooltip>
  );
};

export default PendingInvitationListItem;
