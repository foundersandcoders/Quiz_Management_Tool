'use client'
import uploadAnswers from '@/utils/supabase/uploadAnswers';
import {  useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import checkAdmin from '@/utils/supabase/checkAdmin';

// dont need a 2nd param just use database checks in compnent to see if admin
// handle review vs take via a database check so students cant submit multiple times by using take param
//learner view if completed should show answers imedieatly

export default function QuizInterface({ quizData, answerData, viewMode }){
        const [questionAnswers, setQuestionAnswers] = useState([]);
    const [shuffledQuestions, setShuffledQuestions] = useState([]);
    // const [viewMode, setViewMode] = useState('quiz taker');
    const router = useRouter();
    console.log('view mode in component', viewMode)
     function filterForQuestionAnswer(answerData, questionId){
       const filteredQuestionData = answerData.filter(data => data.question_id === questionId)
       console.log('answer data', answerData)
       console.log("question id", questionId)
       console.log('filtered question data answers', filteredQuestionData[0].answer)

      
      return filteredQuestionData[0].answer 

    
    //   return filteredQuestionData.length > 0 ? filteredQuestionData[0].answer : 'none provided'
    }
// async function completedCheck(answerData){

//     return answerData?.some(quiz => quiz.quiz_id == quizData.id) || false;

// }
// async function determinMode() {
// if(await completedCheck(answerData)){
//     setViewMode('quiz reviewer');}
// if(await checkAdmin()){
//     setViewMode('admin');}
// }



    useMemo(() => {
        //error that says should be in use effect memo seems fine
        // determinMode()

        const shuffled = quizData.questions.map((question) => {
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
    }


    function submitHandler(questionAnswers, quizId){

uploadAnswers(questionAnswers,  quizId);
router.push('/quizzes');
    }

    const letterArray= ['a) ', 'b) ','c) ','d) ','e) ' ]
    return(
        <div>
    <h1>View Mode {viewMode}</h1>
    <h1>{quizData.quiz_name}</h1>
    <h2>assigned {quizData.opens_at}</h2>
    <h2>due date {quizData.closes_at}</h2>
    {/* format time */}
    {shuffledQuestions.map((question, index) => (
        <div key={question.id}>
            {viewMode == 'quiz taker' || viewMode == 'quiz reviewer' &&<button> Report Error</button>}
            <p>{index + 1}. {question.question_text} </p>
            <ul>
                {question.shuffledOptions.map((option, optionIndex) => (
                    <li key={optionIndex} 
                    onClick={() => choiceSelectHandler(question.id, option)}
                    className={`cursor-pointer ${questionAnswers.some(answer => answer.questionId === question.id && answer.response === option) ? 'border border-blue-500' : ''}`} >
                        {letterArray[optionIndex] + option}
                    </li>
                ))}
            </ul>
           {viewMode == 'quiz reviewer' && <p>correct answer {quizData.questions[index].question_answer} your answer {filterForQuestionAnswer(answerData, question.id)}</p>}
        </div>
    ))}
    
   {viewMode == 'quiz taker' && <button onClick={()=> submitHandler(questionAnswers,quizData.id)}>Submit Answers</button>}
        </div>
    )
}