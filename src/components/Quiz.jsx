import { nanoid } from "nanoid";
import { useState } from "react";

export default function Quiz(props) {
  const [quiz, setQuiz] = useState(
    props.quiz.map((quiz) => ({ ...quiz, answered: false }))
  );
  console.log(quiz);

  const [checked, setChecked] = useState([]);

  function selectAnswer(e, id) {
    const target = e.target
    const targetId = e.target.id;
    setQuiz((prev) => {
      return prev.map((quiz) =>
        id === quiz.id ? { ...quiz, answered: !quiz.answered } : quiz
      );
    });

    setChecked(prev => {
      if(target.checked && !checked.includes(target.value)) return [...checked, target.value]
      else return checked.splice(checked.indexOf(target.value), 1)
    })

  if(checked.includes(target.value)){
    console.log(true)
  }

  }
console.log(checked);

 const selectedAnswer = (ans) => checked.includes(ans) ? 'selected' : ''
 console.log(selectedAnswer)

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
                  className={`answer ${selectedAnswer(ans)}`}
                  htmlFor={ans.split(" ").join("")}
                    data-answered={ans}
                >
                  <input
                  onClick={(e) => selectAnswer(e, quiz.id)}
                    type={"radio"}
                    name={quiz.id}
                    value={ans}
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
  return <div className="quiz__container">{questionElements}</div>;
}
