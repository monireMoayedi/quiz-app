import React from "react";
import styles from "../App.module.css";
export default function Trivia({ qa }) {
  return (
    <div className={styles.trivia}>
      <div className={styles.question}>
        {/* Rolex is a company that specializes in what type of product? */}
        {qa.question}
      </div>
      <div className={styles.answers}>
        {qa.answers.map((item) => (
          <div
            className={
              item.correct
                ? `${styles.answer} ${styles.correct}`
                : styles.answer
            }
          >
            {item.text}
          </div>
        ))}

        {/* <div className={styles.answer}>Watches</div>
        <div className={styles.answer}>Food</div>
        <div className={styles.answer}>Cosmetics</div> */}
      </div>
    </div>
  );
}
