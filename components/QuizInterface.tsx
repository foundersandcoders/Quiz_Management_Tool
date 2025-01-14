'use client'
import uploadAnswers from '@/utils/supabase/uploadAnswers';
import {  useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import checkAdmin from '@/utils/supabase/checkAdmin';

// dont need a 2nd param just use database checks in compnent to see if admin
// handle review vs take via a database check so students cant submit multiple times by using take param
//learner view if completed should show answers imedieatly

export default function QuizInterface(quizData){
    const [questionAnswers, setQuestionAnswers] = useState([]);
    const [shuffledQuestions, setShuffledQuestions] = useState([]);
    const router = useRouter();
async function completedCheck(){
    const supabase = await createClient();

    const { data: UserInformation } = await supabase.auth.getUser();
    const { data: userData } = await supabase
    .from('learners')
    .select('id')
    .eq('email', UserInformation.user?.email);
    const { data: answerData } = await supabase
    .from('quiz_question_learner_answers')
    .select('quiz_id')
    .eq('learner_id', userData[0].id );


     

    return answerData?.some(quiz => quiz.quiz_id == quizData.quizData.id) || false;

}
let viewMode = 'quiz taker'
async function determinMode() {
if(await completedCheck()){
    viewMode = 'quiz reviewer'
}
if(await checkAdmin()){
viewMode = 'admin'
}
console.log('admin check result', await checkAdmin())
console.log(viewMode)
}
determinMode()
// if(adminCheck()){
// viewMode = 'admin'
// }



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
    }


    function submitHandler(questionAnswers, quizId){

uploadAnswers(questionAnswers,  quizId);
router.push('/quizzes');
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
                    <li key={optionIndex} 
                    onClick={() => choiceSelectHandler(question.id, option)}
                    className={`cursor-pointer ${questionAnswers.some(answer => answer.questionId === question.id && answer.response === option) ? 'border border-blue-500' : ''}`} >
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