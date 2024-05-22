
import React from 'react';

interface KeyProps {
  letter: string;
  presentLetters: string[]; 
  correctLetters: string[];
  absentLetters: string[];
  typeLetter: (letter: string) => void;
  hitEnter: () => void;
  hitBackSpace: () => void; 
}

const Key: React.FC<KeyProps> = ({ 
  isAbsent,
  isPresent,
  isCorrect,
  letter,
  typeLetter,
}) => {


  return (
    <div
      className={`key ${isAbsent && "key--absent" } ${
        isPresent &&  "key--present" } 
        ${isCorrect && "key--correct" }`}
      onClick={() => typeLetter(letter)}
    >
      {letter}
      </div>
  )
}

export default Key;
