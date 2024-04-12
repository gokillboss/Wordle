import React from 'react';
import { Fragment } from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

const TopBanner = (props) => {
  return (
    <Box textAlign="center">
      <Fragment>
        <Typography
          variant="h3"
          sx={{
            fontFamily: 'nyt-karnakcondensed',
            font: 'inher',
            fontWeight: 700,
            letterSpacing: 0.01,
            flexGrow: 2,
          }}
        >
          Wordle
        </Typography>
      </Fragment>
    </Box>
  );
};

export default TopBanner;
