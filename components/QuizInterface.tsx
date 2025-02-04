'use client'
import uploadAnswers from '@/utils/supabase/uploadAnswers';
import {  useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import checkAdmin from '@/utils/supabase/checkAdmin';
import filterForQuestionAnswer from '@/utils/filterForQuestionAnswers';
import calculateScores from '@/utils/calculateScore';
import { errorReport, question, quiz, quizResponse } from '@/types/supabaseTypes';
import AddModal from './addModal';
import addQuestion from '@/utils/supabase/addQuestion';
import addQuizRecourse from '@/utils/supabase/addQuizRecourse';
import Link from 'next/link';
import addProblemReport from '@/utils/supabase/addProblemReport';
import StudentAnswersDropdown from './StudentAnswersDropdown';
import ResourcesDropdown from './ResourcesDropdown';



export default function QuizInterface({ quizData, answerData, viewMode, allStudentAnswerData, userId}:{quizData:quiz, answerData: quizResponse[], viewMode: 'quiz taker'| 'quiz reviewer'| 'admin', allStudentAnswerData: quizResponse[], userId: number  }){
    const [questionAnswers, setQuestionAnswers] = useState([]);
    const [shuffledQuestions, setShuffledQuestions] = useState([]);
    const [addQuestionIsOpen, setAddQuestionIsOpen] = useState(false)
    const [addQuizRecourseIsOpen, setAddQuizRecourseIsOpen] = useState(false)
    const [quizResources, setQuizResources] = useState([]); // State to hold quiz resources
    const [addProblemReportIsOpen, setAddProblemReportIsOpen] = useState(false)

    const router = useRouter();
// could replace by expanding original database call
    useEffect(() => {

        const fetchQuizResources = async () => {
            const supabase = await createClient();

            const { data, error } = await supabase
            .from('quiz_recourses').select('*').eq('quiz_id', quizData.id);
            if (error) {
                console.error('Error fetching quiz resources:', error);
            } else {
                setQuizResources(data);
            }
        };
        fetchQuizResources();
    }, []); 
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

    function addQuestionHandler(){
        setAddQuestionIsOpen(true)
    }
    function addRecourseHandler(){
        setAddQuizRecourseIsOpen(true)
    }
    function reportProblemHandler() {
        setAddProblemReportIsOpen(true); 
    }
    function submitHandler(questionAnswers, quizId){

uploadAnswers(questionAnswers,  quizId);
router.push('/quizzes');
    }

    const letterArray= ['a) ', 'b) ','c) ','d) ','e) ' ]
    return(
        <div>
            {viewMode == 'admin' && <div>
            <p>Average score {average} out of {quizData.questions.length} points</p>

            <button onClick={()=>addRecourseHandler()}>Add Resource</button> 
    {addQuizRecourseIsOpen && <AddModal dataFunction={addQuizRecourse}  setIsOpen={setAddQuizRecourseIsOpen} relevantId={quizData.id} />
    }
    <ResourcesDropdown resources={quizResources} />
    </div>

}    <h1>View Mode {viewMode}</h1>
    <h1>{quizData.quiz_name}</h1>
    <h2>assigned {quizData.opens_at}</h2>
    <h2>due date {quizData.closes_at}</h2>
    {/* format time */}
    {shuffledQuestions.map((question:question, index) => (
        <div key={question.id}>
<button onClick={()=>reportProblemHandler()}>Report Problem</button> 
    {addProblemReportIsOpen && <AddModal dataFunction={addProblemReport}  setIsOpen={setAddProblemReportIsOpen} relevantId={question.id} />
    }
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
            {viewMode == 'admin' && (
                <div>
                    <StudentAnswersDropdown 
                        questionId={question.id}
                        correctAnswer={quizData.questions[index].question_answer}
                        learnerIds={learnerIds}
                        allStudentAnswerData={allStudentAnswerData}
                    />
                    <ul>
                        <li> Reported errors</li>
                        {question.reported_errors?.map((report:errorReport)=>(
                            <>
                                <li>reported on {report.created_at}</li> 
                                <li>{report.report_text}</li>
                            </>
                        ))}
                    </ul>
                </div>
            )}
           {viewMode == 'quiz reviewer' && <p>correct answer {quizData.questions[index].question_answer} your answer {filterForQuestionAnswer(answerData, question.id, userId).answer}</p>}
        </div>
        //make learn id optional input so when using answer data its not needed
    ))}
    {viewMode == 'admin' && <button onClick={()=>addQuestionHandler()}>Add Question</button>} 
    {addQuestionIsOpen && <AddModal dataFunction={addQuestion}  setIsOpen={setAddQuestionIsOpen} relevantId={quizData.id} />}
    {/* add logic so this only appears if quiz has not gone live yet */}
   {viewMode == 'quiz taker' && <button onClick={()=> submitHandler(questionAnswers,quizData.id)}>Submit Answers</button>}

        </div>
    )
}