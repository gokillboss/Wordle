import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import GuessArea from "./pages/GuessArea";
import Keyboard from "./pages/Keyboard";
import MessageCenter from "./pages/MessageCenter";
import TopBanner from "./pages/TopBanner";
import wordList from "./fiveLetterWords";
import LeafAnimation from "./components/LeafAnimation";

const config = {
  numBoxesPerRow: 5,
  numBoxRows: 6,
  widthOfABox: 50,
  heightOfABox: 50,
  gapBetweenBoxes: 10,
  initialBackgroundColor: "white",
};

let randomIndex = Math.floor(Math.random() * wordList.length);

function App() {
  const [randomWord, setRandomWord] = useState(wordList[randomIndex]);
  const [activeRowIdx, setActiveRowIdx] = useState(0);
  const [right, setRight] = useState([]);
  const [wrong, setWrong] = useState([]);
  const [half, setHalf] = useState([]);
  const [activeRow, setActiveRow] = useState(
    new Array(config.numBoxesPerRow).fill({
      backgroundColor: config.initialBackgroundColor,
    })
  );
  const [message, setMessage] = useState(" ");
  const [completedRows, setCompletedRows] = useState([]);
  const [count, setCount] = useState(0);
  const [remainingRows, setRemainingRows] = useState(
    new Array((config.numBoxRows - 1) * config.numBoxesPerRow).fill({
      backgroundColor: config.initialBackgroundColor,
    })
  );
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    restartGame();
  }, []);

  const restartGame = () => {
    setGameOver(false);
    randomIndex = Math.floor(Math.random() * wordList.length);
    setRandomWord(wordList[randomIndex]);
    setActiveRowIdx(0);
    setRight([]);
    setWrong([]);
    setHalf([]);
    setActiveRow(
      new Array(config.numBoxesPerRow).fill({
        backgroundColor: config.initialBackgroundColor,
      })
    );
    setMessage(" ");
    setCompletedRows([]);
    setCount(0);
    setRemainingRows(
      new Array((config.numBoxRows - 1) * config.numBoxesPerRow).fill({
        backgroundColor: config.initialBackgroundColor,
      })
    );
  };

  const setLetter = (letter) => {
    let tempRight = [];
    let tempWrong = [];
    let tempHalf = [];
    const newActiveRow = activeRow.slice();
    let newCompletedRow = null;
    let newMessage = "  ";
    setMessage(newMessage);

    if (letter === "⌫") {
      if (activeRowIdx > 0) {
        newActiveRow[activeRowIdx - 1] = {
          backgroundColor: config.initialBackgroundColor,
          key: "",
        };
        setActiveRow(newActiveRow);
        setActiveRowIdx(activeRowIdx - 1);
        newMessage = "  ";
        setMessage(newMessage);
      }
    } else if (letter === "⏎") {
      console.log(randomWord);
      if (activeRowIdx < config.numBoxesPerRow) {
        newMessage = "Not enough letters";
        setMessage(newMessage);
      } else if (activeRowIdx === config.numBoxesPerRow) {
        const word = newActiveRow
          .map((box) => box.key)
          .join("")
          .toLowerCase();

        if (wordList.includes(word)) {
          console.log(count);
          const newCompletedBoxes = newActiveRow.map((box, i) => {
            if (word === randomWord) {
              tempRight.push(word.split(""));
              setRight([...right, ...tempRight]);
              newMessage = "Winner Winner Chicken dinner !!!";
              setMessage(newMessage);
              setGameOver(true);
              return { backgroundColor: "green", key: box.key };
            } else if (randomWord.includes(box.key.toLowerCase())) {
              if (box.key.toLowerCase() === randomWord[i]) {
                tempRight.push(box.key);
                setRight([...right, ...tempRight]);
                return { backgroundColor: "green", key: box.key };
              } else {
                tempHalf.push(box.key);
                setHalf([...half, ...tempHalf]);
                return { backgroundColor: "Orange", key: box.key };
              }
            } else {
              tempWrong.push(box.key);
              setWrong([...wrong, ...tempWrong]);
              newMessage = "  ";
              setMessage(newMessage);
              setCount(count + 1);
              if (count >= 5) {
                newMessage = "Guess Failed. The word was: " + randomWord.toUpperCase();
                setMessage(newMessage);
                setGameOver(true);
              }

              return { backgroundColor: "silver", key: box.key };
            }
          });

          setCompletedRows([...completedRows, ...newCompletedBoxes]);

          const newRemainingBoxes = remainingRows.slice(
            0,
            config.numBoxesPerRow
          );
          setActiveRow(newRemainingBoxes);
          setActiveRowIdx(0);

          const remainingRowsStart = [...remainingRows].slice(
            config.numBoxesPerRow
          );
          setRemainingRows([
            ...newActiveRow.slice(config.numBoxesPerRow),
            ...remainingRowsStart,
          ]);
        } else {
          newMessage = "Not in word list !";
          setMessage(newMessage);
        }
      }
    } else {
      if (activeRowIdx < config.numBoxesPerRow) {
        newActiveRow[activeRowIdx] = { backgroundColor: "white", key: letter };
        setActiveRow(newActiveRow);
        setActiveRowIdx(activeRowIdx + 1);
      }
    }
    if (newCompletedRow !== null) {
      setCompletedRows([...completedRows, newCompletedRow]);
    }
  };

  const allBoxes = [...completedRows, ...activeRow, ...remainingRows];

  return (
    <div>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LeafAnimation />
        <Box margin={5}>
          <TopBanner />
        </Box>
        <Box
          marginTop={3}
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minWidth: "290px",
          }}
        >
          <Box>
            <GuessArea allBoxes={allBoxes} />
          </Box>
          <Box>
            <MessageCenter message={message} />
          </Box>

          <Keyboard
            right={right}
            wrong={wrong}
            half={half}
            setLetterCallback={(letter) => setLetter(letter)}
            isDisabled={gameOver}
            marginTop={2}
          />
          <Box marginTop={2}>
            <button onClick={restartGame} style={{ height: "40px" }}>
              Restart Game
            </button>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default App;
