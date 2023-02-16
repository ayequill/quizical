import { nanoid } from "nanoid";
export default function Quiz(props) {
  const questionElements = props.quiz.map((quiz) => {
const answerId = nanoid()

// console.log(props)
    return (
      <div className="quiz">
        <div className="question__container">
          <p className="question">{quiz.question}</p>
        </div>
        <div className="answer__container">
          {quiz.incorrect_answers.map((ans, i) => {
            return (
              <a href="#" className="answer" onClick={() => props.selectAnswer(i)} style={quiz.answered ?
                {backgroundColor: '#D6DBF5'} : {}}>
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
