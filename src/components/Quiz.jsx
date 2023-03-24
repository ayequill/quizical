import { nanoid } from "nanoid";
import { useState } from "react";
import { toast } from "react-toastify";
import Loading from "./Loading";

export default function Quiz(props) {
  /* modifying props and adding an answered boolean */
  const [quiz, setQuiz] = useState(
    props.quiz.map((quiz) => ({ ...quiz, answered: false }))
  );
  /* state to to add what user chose */
  const [checked, setChecked] = useState([]);
  const [quizEnd, setQuizEnd] = useState(false);
    if(props.Loading) return <Loading />

  function selectAnswer(e, id) {
    const target = e.target;
    setQuiz((prev) => {
      return prev.map((quiz) =>
        id === quiz.id ? { ...quiz, answered: !quiz.answered } : quiz
      );
    });

    setChecked(() => {
      if (target.checked && !checked.includes(target.value))
        return [...checked, target.value];
      else return checked.splice(checked.indexOf(target.value), 1);
    });
  }

  const checkScore = () => {
    const correctAnswers = [];
    quiz.map((q) => correctAnswers.push(q.answer) );
    
    return checked.filter((ans, i) => ans === correctAnswers[i]);
  };

  const enableButton = () => checked.length > 9;

  function endGame() {
    setQuizEnd(!quizEnd);
    toast(
      <div className="game__score">
        <p>{`You scored ${checkScore().length} out of ${checked.length}`}</p>
        <button onClick={props.gameStatus} className="btn">
          Goto Homepage
        </button>
      </div>
    );
  }

  const selectedAnswer = (ans) => (checked.includes(ans) ? "selected" : "");

  const questionElements = quiz.map((quiz) => {
    return (
      <div key={nanoid()} className="quiz">
        <div className="question__container">
          <p className="question">{quiz.question}</p>
        </div>
        <div className="answer__container">
          {quiz.answers.map((ans, i) => {
            return (
              <label
                key={i}
                className={`answer ${selectedAnswer(ans)}
                 ${quizEnd && ans === quiz.answer ? "correct" : null}`}
                htmlFor={ans.split(" ").join("")}
                data-answered={ans}
              >
                <input
                  className=""
                  onClick={(e) => selectAnswer(e, quiz.id)}
                  type={"radio"}
                  name={quiz.id}
                  value={ans}
                  data-answer-index={i}
                  id={ans.split(" ").join("")}
                  disabled={quiz.answered}
                />

                {ans}
              </label>
            );
          })}
        </div>
      </div>
    );
  });
  return (
     <div className="quiz__container">
      {questionElements}
      {!quizEnd && (
        <button
          className="check__answer-btn"
          onClick={endGame}
          disabled={!enableButton()}
        >
          {quizEnd ? "Goto Homepage" : "Check Answer"}
        </button>
      )}
      {quizEnd && (
        <button onClick={props.gameStatus} className="btn check__answer-btn">
          Goto Homepage
        </button>
      )}
    </div>
  );
}
