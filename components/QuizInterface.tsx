'use client'
import uploadAnswers from '@/utils/supabase/uploadAnswers';
import {  useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import checkAdmin from '@/utils/supabase/checkAdmin';
import filterForQuestionAnswer from '@/utils/filterForQuestionAnswers';
import calculateScores from '@/utils/calculateScore';
import { quiz, quizResponse } from '@/types/supabaseTypes';
import AddModal from './addModal';
import addQuestion from '@/utils/supabase/addQuestion';



export default function QuizInterface({ quizData, answerData, viewMode, allStudentAnswerData, userId}:{quizData:quiz, answerData: quizResponse[], viewMode: 'quiz taker'| 'quiz reviewer'| 'admin', allStudentAnswerData: quizResponse[], userId: number  }){
    const [questionAnswers, setQuestionAnswers] = useState([]);
    const [shuffledQuestions, setShuffledQuestions] = useState([]);
    const [isOpen, setIsOpen]= useState(false)
    const router = useRouter();
 let average = 0
 let learnerIds =[] 
    if(viewMode == 'admin'){
 learnerIds = [... new Set(allStudentAnswerData.map(answer => answer.learner_id))];
const scores = learnerIds.map(learnerId => {
    return calculateScores(quizData, allStudentAnswerData, learnerId)
})
 average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
}

    useMemo(() => {
       

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

    function addQuestionHandler(setIsOpen){
        setIsOpen(true)
    }
    function submitHandler(questionAnswers, quizId){

uploadAnswers(questionAnswers,  quizId);
router.push('/quizzes');
    }

    const letterArray= ['a) ', 'b) ','c) ','d) ','e) ' ]
    return(
        <div>
            {viewMode == 'admin' && <p>Average score {average} out of {quizData.questions.length} points</p>}
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
            {viewMode == 'admin' && <ul>
                <li>Student answers</li>
            <li>correct answer {quizData.questions[index].question_answer}</li>  
            {learnerIds.map((learner) =>(
                <li key={question.id}>{filterForQuestionAnswer(allStudentAnswerData, question.id, learner).answer+ ' '  }{filterForQuestionAnswer(allStudentAnswerData, question.id, learner).learners?.name}</li>
            ) )}
            </ul> }
           {viewMode == 'quiz reviewer' && <p>correct answer {quizData.questions[index].question_answer} your answer {filterForQuestionAnswer(answerData, question.id, userId).answer}</p>}
        </div>
        //make learn id optional input so when using answer data its not needed
    ))}
    {viewMode == 'admin' && <button onClick={()=>addQuestionHandler(setIsOpen)}>Add Question</button>} 
    {isOpen && <AddModal dataFunction={addQuestion}  setIsOpen={setIsOpen} relevantId={quizData.id} />}
    {/* add logic so this only appears if quiz has not gone live yet */}
   {viewMode == 'quiz taker' && <button onClick={()=> submitHandler(questionAnswers,quizData.id)}>Submit Answers</button>}

        </div>
    )
}