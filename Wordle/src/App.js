import React from 'react';
import  {Fragment, useState} from 'react';
import Box from '@mui/material/Box';
import GuessArea from "./pages/GuessArea";
import Keyboard from "./pages/Keyboard";
import MessageCenter from "./pages/MessageCenter";
import TopBanner from "./pages/TopBanner";
import wordList from './fiveLetterWords'


const config = {
    numBoxesPerRow: 5,
    numBoxRows: 6,
    widthOfABox: 50,
    heightOfABox: 50,
    gapBetweenBoxes: 10,
    initialBackgroundColor: 'white'
};



const randomIndex = Math.floor(Math.random() * wordList.length);
const randomWord = wordList[randomIndex];


function App() {
   

    const [activeRowIdx, setActiveRowIdx] = useState(0);
    const [right,setRight] = useState([]);
    const [wrong,setWrong] = useState([]);
    const [half, setHalf] = useState([]);


    const [activeRow, setActiveRow] = useState(
        new Array(config.numBoxesPerRow).fill({
        backgroundColor: config.initialBackgroundColor
    }));

    const [message, setMessage] = useState(' ');


    const [completedRows, setCompletedRows] = useState([]);
  
    // eslint-disable-next-line
    const [remainingRows, setRemainingRows] = useState(
        new Array((config.numBoxRows - 1) * config.numBoxesPerRow).fill({
            backgroundColor: config.initialBackgroundColor
        })
    );

    //const [rowInx, setRowIdx] = useState(0);
    

    const setLetter = (letter) => {
        //console.log(`Active row contains: ${JSON.stringify(activeRow)}`);
        let tempRight = [];
        let tempWrong = [];
        let tempHalf = [];
        const newActiveRow = activeRow.slice();
        let newCompletedRow = null;
        let newMessage;
        newMessage = '  ' ;
        setMessage(newMessage);
        if (letter === '⌫') {
            console.log(`letter is : ${activeRowIdx}`)
            if (activeRowIdx > 0) {
                newActiveRow[activeRowIdx - 1] = {
                    backgroundColor: config.initialBackgroundColor,
                    key: ''
                };
                setActiveRow(newActiveRow);
                setActiveRowIdx(activeRowIdx - 1);
                newMessage = '  ' ;
                setMessage(newMessage);
            }
    
        } else if (letter === 'Enter') {
            if(activeRowIdx < config.numBoxesPerRow){
                newMessage = 'Not enough letters' ;
                setMessage(newMessage);
            }
            else if (activeRowIdx === config.numBoxesPerRow) {
                const word = newActiveRow.map(box => box.key).join('').toLowerCase();

                if (wordList.includes(word)) {
                    console.log('good');
                    console.log(randomWord);

                    const newCompletedBoxes = newActiveRow.map((box, i) => {
                        if(word === randomWord ){
                            tempRight.push(word.split(""))
                            setRight([...right, ...tempRight])
                            newMessage = 'Winner Winner Chicken diner !!!';
                            setMessage(newMessage);

                            return {
                                backgroundColor: 'green',
                                key: box.key 
                            };

                        } 
                        else if(randomWord.includes(box.key.toLowerCase())){
                          
                            
                            if (box.key.toLowerCase() === randomWord[i] ) {
                                tempRight.push(box.key)
                                setRight([...right, ...tempRight])
                                return {
                                    backgroundColor: 'green',
                                    key: box.key
                                
                                };
                            
                            }
                            else
                            {    
                                tempHalf.push(box.key)
                                setHalf([...half,...tempHalf])
                                return {
                                    
                                    backgroundColor: 'Orange',
                                    key: box.key
                                };  
                            }
                          
                        } else {
                            tempWrong.push(box.key)
                            setWrong([...wrong,...tempWrong])
                            newMessage = '  ' ;
                            setMessage(newMessage);
                            
                            return {
                                backgroundColor: 'silver',
                                key: box.key
                            };

                        }
                        
                    });
                   

                    setCompletedRows([...completedRows, ...newCompletedBoxes]);
                
                    const newRemainingBoxes = remainingRows.slice(0, config.numBoxesPerRow);
                    
                    setActiveRow(newRemainingBoxes);
                    setActiveRowIdx(0);
                
                    const remainingRowsStart = [...remainingRows].slice(config.numBoxesPerRow);
                    setRemainingRows([...newActiveRow.slice(config.numBoxesPerRow), ...remainingRowsStart]);

                } else {
                    console.log('bad');
                    newMessage = 'Not in word list !';
                    setMessage(newMessage);  
                }
            }

        } else {
            if (activeRowIdx < config.numBoxesPerRow) {
                newActiveRow[activeRowIdx] = {
                    backgroundColor: 'white',
                    key: letter
                }
                setActiveRow(newActiveRow);
                setActiveRowIdx(activeRowIdx + 1)
               
            }
        }
        if (newCompletedRow !== null) {
            setCompletedRows([...completedRows, newCompletedRow]);
        }
      
    
    }


    const allBoxes = [...completedRows, ...activeRow, ...remainingRows];



  
    return (
      <Fragment>
            <Box marginBottom={10}>
                <TopBanner />
            </Box>
          <Box margin='auto'
            sx={{
                height: 600,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
          >
            
              <GuessArea 
                        allBoxes = {allBoxes}
                        // activeRow={activeRow}
                        // completedRows = {completedRows}
                        // remainingRows = {remainingRows}
                    
                        />
              <MessageCenter message = {message}/>  

              <Keyboard right = {right}
                        wrong = {wrong}
                        half = {half}                       
                        setLetterCallback = {(letter) => setLetter(letter)}/>
          </Box>
          
          
          
      </Fragment>
  );
}

export default App;
