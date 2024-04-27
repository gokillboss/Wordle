import React, {Fragment} from 'react';
import {Typography, Box} from '@mui/material';

const MessageCenter = (props) => {
    const {message} = props;

    return (
        <Fragment>
            <Box sx={{mt: 5, mb: 5}}>
                <Typography variant='h5'>
                    {message}
                </Typography>
            </Box>
        </Fragment>
    )
}

export default MessageCenter;