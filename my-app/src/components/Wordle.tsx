import { useState, useRef, useEffect, KeyboardEvent, FC, Children } from "react";
import "../styles/Wordies.scss";
import Row from "./Row";
import Keyboard from './Keyboard'; 
import potentialWords from '../data/potentialWords';
import ModalsHelp from "./ModalsHelp";
import {  Button, Flex, FloatButton } from "antd";
import { QuestionCircleOutlined, SettingFilled  } from '@ant-design/icons';
import ModalSetting from "./ModalSetting";
import Footers from "./Footers";
import {HomeOutlined} from '@ant-design/icons';


const SOLUTION =
  potentialWords[Math.floor(Math.random() * potentialWords.length)];



const Wordle: React.FC = () => {
  const [guesses, setGuesses] = useState<string[]>([
    "     ",
    "     ",
    "     ",
    "     ",
    "     ",
    "     ",
  ]);
  const [solutionFound, setSolutionFound] = useState<boolean>(false);
  const [activeLetterIndex, setActiveLetterIndex] = useState<number>(0);
  const [notification, setNotification] = useState<string>("");
  const [activeRowIndex, setActiveRowIndex] = useState<number>(0);
  const [failedGuesses, setFailedGuesses] = useState<string[]>([]);
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [presentLetters, setPresentLetters] = useState<string[]>([]);
  const [absentLetters, setAbsentLetters] = useState<string[]>([]);
  const [gameState, setGameState] = useState<"playing" | "won" | "lost">("playing");
  const [modalActive, setmodalActive] = useState<boolean>(false);
  const [modalActiveSetting, setModalActiveSetting] = useState<boolean>(false);
  // const [Alert, setAlert] = useState<boolean>(false)

  const wordleRef = useRef<HTMLDivElement>(null);

  const resetGame = () => {
    setGuesses([
    "     ",
    "     ",
    "     ",
    "     ",
    "     ",
    "     ",]);
    setSolutionFound(false);
    setActiveLetterIndex(0);
    setNotification("");
    setActiveRowIndex(0);
    setFailedGuesses([]);
    setCorrectLetters([]);
    setPresentLetters([]);
    setAbsentLetters([]);
    setGameState("playing");
  };

  useEffect(() => { 
    if (wordleRef.current) {
        wordleRef.current.focus();
    }
}, []);

  const typeLetter = (letter: string) => {
    if (activeLetterIndex < 5) {
      setNotification("");

      const newGuesses = [...guesses];
      newGuesses[activeRowIndex] = replaceCharacter(
        newGuesses[activeRowIndex],
        activeLetterIndex,
        letter
      );

      setGuesses(newGuesses);
      setActiveLetterIndex((index) => index + 1);
    }
  };

  const replaceCharacter = (string: string, index: number, replacement: string) => {
    return (
      string.slice(0, index) +
      replacement +
      string.slice(index + replacement.length)
    );
  };

  const hitEnter = () => {
    if (activeLetterIndex === 5) {
      const currentGuess = guesses[activeRowIndex];
      if (currentGuess === SOLUTION) {
        setGameState("won");
        console.log('won');

      } else if (activeRowIndex === 5) {
          setGameState("lost");


      }

      if (!potentialWords.includes(currentGuess)) {
        setNotification("NOT IN THE WORD LIST");
      } else if (failedGuesses.includes(currentGuess)) {
        setNotification("WORD TRIED ALREADY");
      } else if (currentGuess === SOLUTION) {
        setSolutionFound(true);
        setNotification("WELL DONE");
        setCorrectLetters([...SOLUTION]);
      } else {
        const correctLetters: string[] = [];

        [...currentGuess].forEach((letter, index) => {
          if (SOLUTION[index] === letter) correctLetters.push(letter);
        });

        setCorrectLetters([...new Set(correctLetters)]);

        setPresentLetters([
          ...new Set([
            ...presentLetters,
            ...[...currentGuess].filter((letter) => SOLUTION.includes(letter)),
          ]),
        ]);

        setAbsentLetters([
          ...new Set([
            ...absentLetters,
            ...[...currentGuess].filter((letter) => !SOLUTION.includes(letter)),
          ]),
        ]);

        setFailedGuesses([...failedGuesses, currentGuess]);
        setActiveRowIndex((index) => index + 1);
        setActiveLetterIndex(0);
      }
    } else {
      setNotification("FIVE LETTER WORDS ONLY");
    }
  };

  const hitBackspace = () =>  {
    setNotification("");

    if (guesses[activeRowIndex][0] !== " ") {
      const newGuesses: string[] = [...guesses];

      newGuesses[activeRowIndex] = replaceCharacter(
        newGuesses[activeRowIndex],
        activeLetterIndex - 1,
        " "
      );

      setGuesses(newGuesses);
      setActiveLetterIndex((index) => index - 1);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (solutionFound) return;

    if (LETTERS.includes(event.key)) {
      typeLetter(event.key);
      return;
    }

    if (event.key === "Enter") {
      hitEnter();
      return;
    }

    if (event.key === "Backspace") {
      hitBackspace();
    }
  };





  return (
    <div
    
      className="wordle"
      ref={wordleRef}
      tabIndex= {0}
      onBlur={(e) => {
        e.target.focus();
      }}
      onKeyDown={handleKeyDown}
    >
      <div className="button-container">
      <h1 className="title">Wordle</h1>
      
      <FloatButton.Group shape="circle" style={{ right: 24 }}>
      <FloatButton tooltip={<div>Help</div>} className="open-btn" onClick={() => setmodalActive(true)} icon={<QuestionCircleOutlined />} type="primary" style={{ right: 90 }} />
      <FloatButton tooltip={<div>Setting</div>} icon={<SettingFilled />} onClick={() => setModalActiveSetting(true)} type="default" style={{ right: 90 }} />
      </FloatButton.Group>
      </div>

      <div className={`notification ${solutionFound && "notification--green"}`}>
        {notification}
      </div>
      <div className="alert">
     <Flex wrap gap="small" className="site-button-ghost-wrapper">
      {gameState === "won" && (
          <div className="alert--won">
            You won! <Button className="btn-won" type="dashed" ghost onClick={resetGame}> <HomeOutlined />Play Again</Button>
          </div>
        )}

        {gameState === "lost" && (
          <div className="alert--lost">
            You lost! The word was {SOLUTION}. <Button  type="dashed" ghost className="btn-lost" onClick={resetGame}> <HomeOutlined />Play Again</Button>
          </div>
        )}
        </Flex>
        </div>
      {guesses.map((guess, index) => {
        return (
          <Row
            key={index}
            word={guess}
            applyRotation={
              activeRowIndex > index ||
              (solutionFound && activeRowIndex === index)
            }
            solution={SOLUTION}
            bounceOnError={
              notification !== "WELL DONE" &&
              notification !== "" &&
              activeRowIndex === index
            }
          />
        );
      })}
      <Keyboard
        presentLetters={presentLetters}
        correctLetters={correctLetters}
        absentLetters={absentLetters}
        typeLetter={typeLetter}
        hitEnter={hitEnter}
        hitBackspace={hitBackspace}
      />
      <Footers />
<ModalsHelp active={modalActive} setActive={setmodalActive}/>

<ModalSetting active={modalActiveSetting} setActive={setModalActiveSetting}/>



    </div>
  );
}

export default Wordle;