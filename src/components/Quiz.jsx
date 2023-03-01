import { nanoid } from "nanoid";
import { useState } from "react";

export default function Quiz(props) {
  /* modifying props and adding an answered boolean */
  const [quiz, setQuiz] = useState(
    props.quiz.map((quiz) => ({ ...quiz, answered: false }))
  );
  /* state to to add what user chose */
  const [checked, setChecked] = useState([]);
  const [quizEnd, setQuizEnd] = useState(false);

  function selectAnswer(e, id) {
    const target = e.target;
    setQuiz((prev) => {
      return prev.map((quiz) =>
        id === quiz.id ? { ...quiz, answered: !quiz.answered } : quiz
      );
    });

    setChecked((prev) => {
      if (target.checked && !checked.includes(target.value))
        return [...checked, target.value];
      else return checked.splice(checked.indexOf(target.value), 1);
    });
  }

  const checkScore = () => {
    const correctAnswers = [];
    quiz.map((q, i) => {
      correctAnswers.push(q.answer);
    });
    return checked.filter((ans, i) => ans === correctAnswers[i]);
  };

  const enableButton = () => checked.length === 5;

  function endGame() {
    setQuizEnd(!quizEnd);
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
                 ${quizEnd && ans === quiz.answer ? "correct" : ""}`}
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
      <button
        className="check__answer-btn"
        onClick={endGame}
        disabled={!enableButton()}
      >
        Check Answer
      </button>
      {quizEnd && (
        <div className="game__over-modal">
          <p>{`You scored ${checkScore().length} out of ${checked.length}`}</p>
          <button onClick={props.gameStatus} className="btn">
            Goto Homepage
          </button>
        </div>
      )}
    </div>
  );
}
