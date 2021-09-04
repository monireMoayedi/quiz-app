import { useState, useEffect } from "react";
import styles from "./Trivia.module.css";
export default function Trivia({ currentTrivia, setResult, resetTimer }) {
  const [userAnswer, setuserAnswer] = useState(null);

  useEffect(() => {
    if (userAnswer !== null) {
      console.log(`next`, userAnswer.correct);
      const showResult = setTimeout(() => {
        setResult(userAnswer.correct);
        resetTimer();
      }, 3000);
      return () => {
        clearTimeout(showResult);
      };
    }
  }, [userAnswer, setResult, resetTimer]);

  const correctText = (text) =>
    text.replace(/&quot;/g, '"').replace(/&#039;/g, '"');

  const responseHandler = (item) => {
    if (!userAnswer) {
      setuserAnswer(item);
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
              item.text === userAnswer?.text
                ? `${styles.answer} ${
                    item.correct ? styles.correct : styles.wrong
                  }`
                : styles.answer
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
