import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { useQuery } from "react-query";
import { ToastContainer } from "react-toastify";
import "./sass/App.scss";
import "react-toastify/dist/ReactToastify.min.css";
import Homepage from "./components/Homepage";
import Loading from "./components/Loading";
import Quiz from "./components/Quiz";

function App() {
  const [startGame, setStartGame] = useState(false);
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [startGame]);

  const { isLoading, error, data, isFetching } = useQuery("repoData", () =>
    fetch(
      "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple"
    ).then((res) => res.json())
  );

  if (isLoading) return <Loading />;

  const quizData = function generateQuiz() {
    const quizArray = [];
    data.results.map((quiz) =>
      quizArray.push({
        id: nanoid(),
        category: quiz.category,
        question: quiz.question,
        answers: shuffleArray(
          quiz.incorrect_answers.concat(quiz.correct_answer)
        ),
        answer: quiz.correct_answer,
      })
    );
    return quizArray;
  };

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
    setQuiz(quizData);
  }

  if (loading) return <Loading />;

  return (
    <div className="App">
      <main className="main">
        {!startGame && <Homepage startQuiz={startQuiz} />}
        {startGame && (
          <Quiz quiz={quiz} gameStatus={startQuiz} loading={loading} />
        )}
      </main>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
