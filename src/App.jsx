import styles from "./App.module.css";
import { useState, useEffect, useCallback, Fragment } from "react";
import Quiz from "./components/Quiz";
import Pyramid from "./components/Pyramid";
// import useSound from "use-sound";
// import play from "./sounds/play.mp3";

function App() {
  const [quiz, setquiz] = useState([]);
  const [finish, setfinish] = useState(false);
  const [questionNumber, setquestionNumber] = useState(0);
  const [prize, setprize] = useState(0);
  // const [letsplay] = useSound(play);

  // useEffect(() => {
  //   setfinish(false);
  //   const play = setTimeout(() => {
  //     letsplay();
  //   }, 0);
  //   return () => {
  //     clearTimeout(play);
  //   };
  // }, [letsplay]);

  const fetchQuiz = useCallback(async () => {
    const res = await fetch(
      "https://opentdb.com/api.php?amount=15&type=multiple"
    );
    const { results: data } = await res.json();

    const easy = data.filter((item) => item.difficulty === "easy");
    const medium = data.filter((item) => item.difficulty === "medium");
    const hard = data.filter((item) => item.difficulty === "hard");

    const quizArr = [...easy, ...medium, ...hard];

    const trivia = quizArr.map((item, index) => {
      const ans = item.incorrect_answers.map((item) => {
        return { text: item, correct: false };
      });
      ans.splice(Math.floor(Math.random() * 5), 0, {
        text: item.correct_answer,
        correct: true,
      });

      return {
        id: ++index,
        question: item.question,
        answers: ans,
      };
    });

    console.log("trivia :>> ", trivia);

    setquiz(trivia);
  }, []);

  useEffect(() => {
    fetchQuiz();
  }, [fetchQuiz]);

  const setStop = useCallback(() => setfinish(true), []);
  const setResult = useCallback(
    (result) =>
      result ? setquestionNumber((prev) => ++prev) : setfinish(true),
    []
  );

  const userPrize = useCallback((p) => {
    setprize(p);
  }, []);

  return (
    <Fragment>
      <div className={styles.App}>
        {quiz[questionNumber]?.question && (
          <Fragment>
            <Quiz
              trivia={quiz}
              stop={finish}
              setStop={setStop}
              setResult={setResult}
              questionNumber={questionNumber}
              prize={prize}
            />
            <Pyramid
              currentTrivia={quiz[questionNumber]}
              userPrize={userPrize}
            />
          </Fragment>
        )}
      </div>
    </Fragment>
  );
}

export default App;
