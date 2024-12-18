'use client'
import uploadAnswers from '@/utils/supabase/uploadAnswers';
import {  useState, useMemo } from 'react';


export default function QuizInterface(quizData){
    const [questionAnswers, setQuestionAnswers] = useState([]);
    const [shuffledQuestions, setShuffledQuestions] = useState([]);

    useMemo(() => {
        const shuffled = quizData.quizData.questions.map((question) => {
            const options = [question.question_answer, ...question.question_false_answers];
            return {
                ...question,
                shuffledOptions: shuffleArray(options),
            };
        });
        setShuffledQuestions(shuffled);
    }, []); 

    function shuffleArray (array:string[]) {


        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };
    function choiceSelectHandler(questionId, answer){
        const filteredAnswers = questionAnswers.filter(answer=> (answer.questionId !== questionId))
        filteredAnswers.push({questionId: questionId, response: answer})
    setQuestionAnswers(filteredAnswers)
    console.log(filteredAnswers)
    }


    function submitHandler(questionAnswers, quizId){

uploadAnswers(questionAnswers,  quizId)
    }

    const letterArray= ['a) ', 'b) ','c) ','d) ','e) ' ]
    return(
        <div>
    <h1>{quizData.quizData.quiz_name}</h1>
    <h2>assigned {quizData.quizData.opens_at}</h2>
    <h2>due date {quizData.quizData.closes_at}</h2>
    {/* format time */}
    {shuffledQuestions.map((question, index) => (
        <div key={question.id}>
            <p>{index + 1}. {question.question_text} </p>
            <ul>
                {question.shuffledOptions.map((option, optionIndex) => (
                    <li key={optionIndex} onClick={() => choiceSelectHandler(question.id, option)}>
                        {letterArray[optionIndex] + option}
                    </li>
                ))}
            </ul>
        </div>
    ))}
    
    <button onClick={()=> submitHandler(questionAnswers,quizData.quizData.id)}>Submit Answers</button>
        </div>
    )
}