import styles from "./Quiz.module.css";
import Trivia from "./Trivia";
import { useState, useEffect, Fragment, useCallback } from "react";
function Quiz({ trivia, setStop, setResult, questionNumber, stop, prize }) {
  const [timer, settimer] = useState(30);

  useEffect(() => {
    const timerDec = setTimeout(() => {
      settimer((prev) => prev - 1);
      if (timer === 0) {
        setStop(true);
      }
    }, 1000);
    return () => {
      clearTimeout(timerDec);
    };
  }, [timer, setStop]);

  const resetTimer = useCallback(() => {
    settimer(30);
  }, []);
  return (
    <Fragment>
      <div className={styles.main}>
        {stop && (
          <div className={styles.result}>
            <p>You earned: $ {prize}</p>
          </div>
        )}
        {!stop && (
          <Fragment>
            <div className={styles.top}>
              <div className={styles.timer}>{timer}</div>
            </div>
            <div className={styles.bottom}>
              <Trivia
                currentTrivia={trivia[questionNumber]}
                setResult={setResult}
                resetTimer={resetTimer}
                key={trivia[questionNumber].id}
              />
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
}

export default Quiz;
