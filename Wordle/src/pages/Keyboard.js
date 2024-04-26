import React, { Fragment } from 'react';
import Button from '@mui/material/Button';

const Keyboard = (props) => {
    const { right, wrong, half, isDisabled, setLetterCallback } = props;

    const colorKey = (letter) => {
        if (right && right.indexOf(letter) !== -1) { return "green"; }
        if (wrong && wrong.indexOf(letter) !== -1) { return "grey"; }
        if (half && half.indexOf(letter) !== -1) { return "orange"; }
        return 'silver';
    };

    const back = '⌫';
    const enter = '⏎';
    const keys = [
        'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
        'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
        'Z', 'X', 'C', 'V', 'B', 'N', 'M'
    ];
    const rowStyle = {
        display: 'flex',
        justifyContent: 'center'
    };

    const buttonStyle = (letter) => ({
        backgroundColor: colorKey(letter),
        margin: '3px',
        width: 'calc(10vw - 10px)', 
        height: 'calc(10vw - 1px)', 
        minWidth: '20px', 
        minHeight: '20px', 
        maxWidth: '60px',
        maxHeight: '40px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: 'White',

    });

    return (
        <Fragment>
            <div style={rowStyle}>
                {keys.slice(0, 10).map(letter => (
                    <Button key={letter}
                        sx={buttonStyle(letter)}
                        onClick={() => setLetterCallback(letter)}
                        disabled={isDisabled}>
                        {letter}
                    </Button>
                ))}
                 <Button sx={buttonStyle()}
                        onClick={() => setLetterCallback(back)}
                        disabled={isDisabled}>
                    {back}
                </Button>
            </div>
            <div style={rowStyle}>
                {keys.slice(10, 19).map(letter => (
                    <Button key={letter}
                        sx={buttonStyle(letter)}
                        onClick={() => setLetterCallback(letter)}
                        disabled={isDisabled}>
                        {letter}
                    </Button>
                ))}
                                <Button sx={buttonStyle()}
                        onClick={() => setLetterCallback(enter)}
                        disabled={isDisabled}>
                    {enter}
                </Button>
            </div>
            <div style={rowStyle}>

                {keys.slice(19).map(letter => (
                    <Button key={letter}
                        sx={buttonStyle(letter)}
                        onClick={() => setLetterCallback(letter)}
                        disabled={isDisabled}>
                        {letter}
                    </Button>
                ))}
            </div>
        </Fragment>
    );
};

export default Keyboard;
