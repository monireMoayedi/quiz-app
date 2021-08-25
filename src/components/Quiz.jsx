import styles from "./Quiz.module.css";
import Trivia from "./Trivia";
function Quiz({ trivia }) {
  return (
    <div className={styles.main}>
      <div className={styles.top}>
        <div className={styles.timer}>30</div>
      </div>
      <div className={styles.bottom}>
        <Trivia currentTrivia={trivia[0]} />
      </div>
    </div>
  );
}

export default Quiz;
