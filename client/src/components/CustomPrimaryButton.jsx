import React from "react";
//import Button from "@mui/material/Button";
import LoadingButton from '@mui/lab/LoadingButton';

const CustomPrimaryButton = ({
  label,
  additionalStyles,
  disabled,
  onClick,
  statusLoading = false
}) => {
  return <LoadingButton sx={{
    bgColor: '#5865F2',
    color: 'white',
    textTransform: 'none',
    fontSize: '16px',
    fontWeight: 500,
    width: '200px',
    height: '40px'
  }}
   style={additionalStyles ? additionalStyles : {}}
   disabled={disabled}
   variant="contained"
   loading={statusLoading}

   onClick={onClick}
   >
    {label}
   </LoadingButton>;
};

export default CustomPrimaryButton;
