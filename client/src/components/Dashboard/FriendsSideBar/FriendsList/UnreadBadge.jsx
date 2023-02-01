import React from 'react';
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";

const UnreadBadge = ({ count }) => {
  return (
    <Badge style={{ marginRight: "10px" }} badgeContent={count} color="secondary">
          <MailIcon style={{ color: "white" }} />
    </Badge>
  )
}

export default UnreadBadge