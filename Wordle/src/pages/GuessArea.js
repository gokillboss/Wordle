// eslint-disable-next-line
import React, {Fragment, useState} from 'react';
//import Box from '@mui/material/Box';
import {Grid} from "@mui/material";
import LetterBox from './LetterBox';

const config = {
    numBoxesPerRow: 5,
    numRows: 6,
    widthOfABox: 50,
    heightOfABox: 50,
    gapBetweenBoxes: 10,
    initialBackgroundColor: 'white'
};






const GuessArea = (props) => {

  
    //const { activeRow, completedRows, remainingRows } = props;
    const {allBoxes} = props
    

    // The guess area divides into three groups of rows stacked. They are:
    //    1. Already completed rows. Initially, this group is empty.
    //    2. The guess row. Keyboard letters get displayed in the boxes of this row.
    //    3. The unused rows. Initially, there are five such rows.


    console.log(`number of squared in allBoxes is ${allBoxes.length}`);


    return (
        <Fragment>
            <Grid  container columns={config.numBoxesPerRow}
                   sx={{
                       width: config.numBoxesPerRow * config.widthOfABox +
                                (config.numBoxesPerRow - 1) * config.gapBetweenBoxes,
                   }}
            >
            {
                allBoxes.map((elementAttributes, idx) =>
                    <Grid item
                          key={idx}
                          xs={1}
                          sx={{mb: 0.8}}
                    >
                        <LetterBox index={idx} value={elementAttributes} />
                    </Grid>
                )
            }
            </Grid>
        </Fragment>
    )
}

export default GuessArea;