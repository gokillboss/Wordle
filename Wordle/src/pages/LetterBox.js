import React from 'react';
import Box from '@mui/material/Box';

const config = {
    numBoxesPerRow: 5,
    numRows: 6,
    widthOfABox: 50,
    heightOfABox: 50,
    gapBetweenBoxes: 10,

    initialBackgroundColor: 'white'
};



const LetterBox = (props) => {

    const { value } = props;
    const { backgroundColor, key } = value;

    return (
        <Box sx={{
            width: config.widthOfABox,
            height: config.heightOfABox,
            border: 1,
            borderColor: 'black',
            backgroundColor,
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            {key}
        </Box>
    )
}

export default LetterBox
