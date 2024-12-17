'use client'
import {  useState } from 'react';


export default function QuizInterface(quizData){
    const [questionAnswers, setQuestionAnswers] = useState([]);

function shuffleArray (array:string[]) {


    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};
function choiceSelectHandler(questionID, answer){
    const filteredAnswers = questionAnswers.filter(answer=> (answer.questionNumber !== questionId))
    filteredAnswers.push({questionNumber: questionID, response: answer})
setQuestionAnswers(filteredAnswers)
console.log(filteredAnswers)
}
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
                                <li key={optionIndex} onClick={()=>choiceSelectHandler(question.id, option)}>{letterArray[optionIndex] + option}</li>
                            ))}
                        </ul>
        </div>
        )
    })}
    
    <button>Submit Answers</button>
        </div>
    )
}