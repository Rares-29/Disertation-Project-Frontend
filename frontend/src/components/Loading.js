import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loading() {
  return (
    <Box sx={{ display: 'flex', justifyContent:"center" }}>
      <CircularProgress thickness={8} style = {{color:"var(--main)"}} />
    </Box>
  );
}