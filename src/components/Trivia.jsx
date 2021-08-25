import React from "react";
import styles from "./Trivia.module.css";
export default function Trivia({ currentTrivia }) {
  const correctText = (text) =>
    text.replace(/&quot;/g, '"').replace(/&#039;/g, '"');

  return (
    <div className={styles.trivia}>
      <div className={styles.question}>
        {correctText(currentTrivia.question)}
      </div>

      <div className={styles.answers}>
        {currentTrivia.answers.map((item) => (
          <div
            className={
              item.correct
                ? `${styles.answer} ${styles.correct}`
                : styles.answer
            }
          >
            {correctText(item.text)}
          </div>
        ))}
      </div>
    </div>
  );
}
