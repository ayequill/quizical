import { nanoid } from "nanoid";
export default function Quiz(props) {
  const questionElements = props.quiz.map((quiz) => {

    return (
      <div className="quiz">
        <div className="question__container">
          <p className="question">{quiz.question}</p>
        </div>
        <div className="answer__container">
          {quiz.incorrect_answers.map((ans) => {
            return (
              <a href="#" className="answer">
                {ans}
              </a>
            );
          })}
          {()=> {
            const answers =[]
            
          }}
        </div>
      </div>
    );
  });
  return <div className="quiz__container">{questionElements}</div>;
}
