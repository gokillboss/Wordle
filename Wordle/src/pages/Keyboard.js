import React, {Fragment} from 'react';
import Button from '@mui/material/Button'





const Keyboard = (props) => {

  const {right,wrong,half} = props
  console.log(props)
  const colorKey = (letter) => {
    if(right && right.indexOf(letter) !== -1)
        {return "green";}
    else    
    if(wrong && wrong.indexOf(letter) !== -1)
        {return "grey";}
    else
    if(half && half.indexOf(letter) !== -1)
        {return "orange";}
    
    return 'silver'
  }

 
  const {setLetterCallback, } = props;
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
        orientation : "vertical",
        margin: '5px',
        width: '40px',
        height: '40px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: 'white',
    }
  }

  
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
           sx={buttonStyle(letter) }
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