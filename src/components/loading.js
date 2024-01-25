import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

const LoadingComponent = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
        >
            <CircularProgress color="primary" size={40} />
            <Typography variant="body2" color="textSecondary" style={{ marginTop: 10 }}>
                Carregando...
            </Typography>
        </Box>
    );
};

export default LoadingComponent;
