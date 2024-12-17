export default function QuizInterface(quizData){
function shuffleArray (array:string[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};
const letterArray= ['a) ', 'b) ','c) ','d) ','e) ' ]
    return(
        <div>
    <h1>{quizData.quizData.quiz_name}</h1>
    <h2>assigned {quizData.quizData.opens_at}</h2>
    <h2>due date {quizData.quizData.closes_at}</h2>
    {/* format time */}
    {quizData.quizData.questions.map((question, index)=>{
        const options = [question.question_answer, ...question.question_false_answers];
        // Shuffle the options
        const shuffledOptions = shuffleArray(options);

        return(
        <div>
        <p>{index +1}. {question.question_text} </p>
        <ul>
                            {shuffledOptions.map((option, optionIndex) => (
                                <li key={optionIndex}>{letterArray[optionIndex] + option}</li>
                            ))}
                        </ul>
        </div>
        )
    })}
    
    
        </div>
    )
}