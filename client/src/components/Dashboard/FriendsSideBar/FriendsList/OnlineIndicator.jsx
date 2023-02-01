import React from 'react'
import FiberManualRecordIcon  from '@mui/icons-material/FiberManualRecord';
import Box from '@mui/material/Box';


const OnlineIndicator = () => {
  return (
    <Box sx={{
        color: '#3ba55d',
        display: 'flex',
        alignItems: 'center',
    }}>
        <FiberManualRecordIcon />
    </Box>
  )
}

export default OnlineIndicator