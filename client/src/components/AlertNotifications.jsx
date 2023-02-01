import React from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from "react-redux";
import { alertSelector } from "redux/alert/selector";
import { closeAlertMessage } from "redux/alert/slice";

const AlertNotifications = () => {
   const dispatch = useDispatch(); 
   const {showAlertMessage, alertMessageContent} = useSelector(alertSelector);  

  return (
    <Snackbar
      open={showAlertMessage}
      onClose={() => dispatch(closeAlertMessage())}
      autoHideDuration={1500}
    >
      <Alert severity="info">{alertMessageContent}</Alert>
    </Snackbar>
  );
};

export default AlertNotifications;
