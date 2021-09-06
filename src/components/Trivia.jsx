import { useState, useEffect } from "react";
import styles from "./Trivia.module.css";
import useSound from "use-sound";
// import play from "../sounds/play.mp3";
// import useSound from "use-sound";

import correct from "../sounds/correct.mp3";
import wrong from "../sounds/wrong.mp3";

export default function Trivia({ currentTrivia, setResult, resetTimer }) {
  const [selectedAnswer, setselectedAnswer] = useState(null);
  const [className, setclassName] = useState(null);

  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);

  useEffect(() => {
    console.log(
      "currentTrivia.answers.answ :>> ",
      currentTrivia.answers.find((a) => a.correct === true)
    );
  }, [currentTrivia.answers]);

  // useEffect(() => {
  //   letsPlay();
  // }, [letsPlay]);

  const delay = (callback, delay) => {
    setTimeout(callback, delay);
  };
  useEffect(() => {
    // console.log(`next`, selectedAnswer.correct);
    const activeAnswer = delay(() => {
      if (selectedAnswer !== null) {
        selectedAnswer?.correct
          ? setclassName(`${styles.answer} ${styles.correct} `)
          : setclassName(`${styles.answer} ${styles.wrong} `);
      }
    }, 2000);

    // const showResult = delay(() => {
    //   setResult(selectedAnswer.correct);
    //   resetTimer();
    // }, 6000);

    return () => {
      clearTimeout(activeAnswer);
    };
  }, [selectedAnswer]);
  // }, [selectedAnswer, setResult, resetTimer, correctAnswer, wrongAnswer]);
  useEffect(() => {
    const showResult = delay(() => {
      if (selectedAnswer !== null) {
        setResult(selectedAnswer.correct);
        resetTimer();
      }
    }, 6000);

    return () => {
      clearTimeout(showResult);
    };
  }, [selectedAnswer, resetTimer, setResult]);

  useEffect(() => {
    const correctAnswer = () => console.log("correct :>> ");
    const wrongAnswer = () => console.log("wrong :>> ");

    const playSound = delay(() => {
      if (selectedAnswer !== null) {
        selectedAnswer?.correct ? correctAnswer() : wrongAnswer();
      }
    }, 3000);

    return () => {
      clearTimeout(playSound);
    };
  }, [selectedAnswer, correctAnswer, wrongAnswer]);

  const correctText = (text) =>
    text.replace(/&quot;/g, '"').replace(/&#039;/g, '"');

  const responseHandler = (item) => {
    setclassName(`${styles.answer} ${styles.active}`);
    if (!selectedAnswer) {
      setselectedAnswer(item);
    }
  };

  return (
    <div className={styles.trivia}>
      <div className={styles.question}>
        {correctText(currentTrivia.question)}
      </div>

      <div className={styles.answers}>
        {currentTrivia.answers.map((item, index) => (
          <div
            key={index}
            className={
              item.text === selectedAnswer?.text
                ? className
                : // ? `${styles.answer} ${
                  //     item.correct ? styles.correct : styles.wrong
                  //   }`
                  styles.answer
            }
            onClick={responseHandler.bind(null, item)}
          >
            {correctText(item.text)}
          </div>
        ))}
      </div>
    </div>
  );
}
