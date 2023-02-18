import { nanoid } from "nanoid";

export default function Quiz(props) {
  const questionElements = props.quiz.map((quiz) => {
    return (
      <div key={nanoid()} className="quiz">
        <div className="question__container">
          <p className="question">{quiz.question}</p>
        </div>
        <div className="answer__container">
          {quiz.answers.map((ans) => {
            return (
              <a
                href="#"
                key={nanoid()}
                className="answer"
                onClick={(e) => props.selectAnswer(quiz.id, e)}
                style={
                  props.selectedAnswer ? { backgroundColor: "#D6DBF5" } : {}
                }
                data-answered={ans}
              >
                {ans}
              </a>
            );
          })}
        </div>
      </div>
    );
  });
  return <div className="quiz__container">{questionElements}</div>;
}
