import styles from "./App.module.css";
import { useState, useEffect, useCallback } from "react";
import Quiz from "./components/Quiz";
import Pyramid from "./components/Pyramid";
function App() {
  const [quiz, setquiz] = useState([]);
  // const [currentTrivia, setcurrentTrivia] = useState("");

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

  return (
    <div className={styles.App}>
      {quiz[0]?.question && <Quiz trivia={quiz} />}
      {quiz.length > 0 && <Pyramid currentTrivia={quiz[0]} />}
    </div>
  );
}

export default App;

// const data = [
//   {
//     id: 1,
//     question: "Rolex is a company that specializes in what type of product?",
//     answers: [
//       {
//         text: "Phone",
//         correct: false,
//       },
//       {
//         text: "Watches",
//         correct: true,
//       },
//       {
//         text: "Food",
//         correct: false,
//       },
//       {
//         text: "Cosmetic",
//         correct: false,
//       },
//     ],
//   },
//   {
//     id: 2,
//     question: "When did the website `Facebook` launch?",
//     answers: [
//       {
//         text: "2004",
//         correct: true,
//       },
//       {
//         text: "2005",
//         correct: false,
//       },
//       {
//         text: "2006",
//         correct: false,
//       },
//       {
//         text: "2007",
//         correct: false,
//       },
//     ],
//   },
//   {
//     id: 3,
//     question: "Who played the character of harry potter in movie?",
//     answers: [
//       {
//         text: "Johnny Deep",
//         correct: false,
//       },
//       {
//         text: "Leonardo Di Caprio",
//         correct: false,
//       },
//       {
//         text: "Denzel Washington",
//         correct: false,
//       },
//       {
//         text: "Daniel Red Cliff",
//         correct: true,
//       },
//     ],
//   },
// ];
