import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./sass/App.scss";
import Homepage from "./components/Homepage";
import Quiz from "./components/Quiz";
import axios from "axios";
import { dummyData } from "./data.js";

function App() {
  // const { isLoading, error, data, isFetching } = useQuery("repoData", () =>
  //   axios
  //     .get(
  //       "https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple"
  //     )
  //     .then((res) => res.data)
  // );
  // if (isLoading) return 'Loading'
  // if (error) return 'An error has occured:' + error.message

  const quizData = function generateQuiz() {
    const quizArray = [];
    dummyData.map(quiz => quizArray.push({
      id: nanoid (),
      category: quiz.category,
      question: quiz.question,
      answers: shuffleArray(quiz.incorrect_answers.concat(quiz.correct_answer)),
      answer: quiz.correct_answer,
    }))
    return quizArray;
  };


  const [startGame, setStartGame] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(false);
  const [quiz, setQuiz] = useState(quizData);

  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = arr[i];
      arr[j] = temp;
    }
    return arr;
  }


  function startQuiz() {
    setStartGame((prevState) => !prevState);
  }
  

  return (
    <div className="App">
      <main className="main">
        {!startGame && <Homepage startQuiz={startQuiz} />}
        {startGame && (
          <Quiz
            quiz={quiz}
            gameStatus={startQuiz}
          />
        )}
      </main>
    </div>
  );
}

export default App;
