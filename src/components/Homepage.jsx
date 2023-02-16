
export default function Homepage (props) {
    return (
        <>
        <div className="homepage">
            <h2 className='title'>Quizzical</h2>
            <p className='description'>Challenge</p>
            <button onClick={props.startQuiz} className="btn">Start Quiz</button>
        </div>
        </>
    )
}