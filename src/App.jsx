import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./sass/App.scss";
import Homepage from "./components/Homepage";
import Quiz from "./components/Quiz";
import axios from "axios";
import {dummyData} from './data.js'

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
  const [startGame , setStartGame] = useState(false)
  const arr = dummyData.map(ans => {
    return {...ans, id: nanoid(), answered: false }
  }
  )
  const [quiz, setQuiz] = useState(arr)

  function startQuiz () {
    setStartGame(prevState => !prevState)
}

function selectAnswer (id) {
  setQuiz(prevState => prevState.map(quiz => {
    return id === quiz.id ? {...quiz,  answered: !quiz.answered } :  quiz
  }))
  console.log(id)
  console.log(quiz)
}

  return (
      <div className="App">
        <main className="main">
       {!startGame && <Homepage startQuiz={startQuiz} />}
       { startGame &&<Quiz quiz={quiz} selectAnswer={selectAnswer}/> }
        </main>
      </div>
  );
}

export default App;
