import React, { Fragment } from 'react';
import Button from '@mui/material/Button'





const Keyboard = (props) => {

    const { right, wrong, half } = props
   // console.log(props)
    const colorKey = (letter) => {
        if (right && right.indexOf(letter) !== -1) { return "green"; }
        else
            if (wrong && wrong.indexOf(letter) !== -1) { return "grey"; }
            else
                if (half && half.indexOf(letter) !== -1) { return "orange"; }

        return 'silver'
    }


    const { setLetterCallback, } = props;
    const back = '⌫';
    const enter = 'Enter';
    const keys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];
    const rowStyle = {
        display: 'flex',
        justifyContent: 'center'
    }



    const buttonStyle = (letter) => {
        return {
            backgroundColor: colorKey(letter),
            margin: '5px',
            width: 'calc(10vw - 10px)', // Adjust the width based on the viewport width
            height: 'calc(10vw - 10px)', // Adjust the height based on the viewport width
            minWidth: '30px', // Set a minimum width to maintain button size
            minHeight: '20px', // Set a minimum height to maintain button size
            maxWidth: '60px', // Set a maximum width to prevent buttons from becoming too large
            maxHeight: '40px', // Set a maximum height to prevent buttons from becoming too large
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: 'white',
        };
    };
    


    return (
        <Fragment>
            <div style={rowStyle}>
                {keys.slice(0, 10).map(letter => (
                    <Button key={letter}
                        sx={buttonStyle(letter)}
                        onClick={() => {
                            setLetterCallback(letter);
                        }}>
                        {letter}
                    </Button>
                ))}
            </div>
            <div style={rowStyle} >
                {keys.slice(10, 19).map(letter => (
                    <Button key={letter}
                        sx={buttonStyle(letter)}
                        onClick={() => {
                            setLetterCallback(letter);
                        }}>
                        {letter}
                    </Button>
                ))}
            </div>
            <div style={rowStyle}>

                <Button sx={buttonStyle()}
                    onClick={() => {
                        setLetterCallback(enter);
                    }}>{enter}</Button>



                {keys.slice(19).map(letter => (
                    <Button key={letter}
                        sx={buttonStyle(letter)}
                        onClick={() => {
                            setLetterCallback(letter);
                        }}>
                        {letter}
                    </Button>
                ))}

                <Button sx={buttonStyle()}
                    onClick={() => {
                        setLetterCallback(back);

                    }}>{back}</Button>

            </div>
        </Fragment>
    );
};

export default Keyboard;