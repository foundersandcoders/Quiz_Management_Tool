'use client'
import uploadAnswers from '@/utils/supabase/uploadAnswers';
import {  useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import filterForQuestionAnswer from '@/utils/filterForQuestionAnswers';
import calculateScores from '@/utils/calculateScore';
import { errorReport, question, quiz, quiz_recourse, quizResponse } from '@/types/supabaseTypes';
import AddModal from './addModal';
import addQuestion from '@/utils/supabase/addQuestion';
import addQuizRecourse from '@/utils/supabase/addQuizRecourse';
import addProblemReport from '@/utils/supabase/addProblemReport';
import StudentAnswersDropdown from './StudentAnswersDropdown';
import ResourcesDropdown from './ResourcesDropdown';



export default function QuizInterface({ quizData, answerData, viewMode, allStudentAnswerData, userId}:{quizData:quiz, answerData: quizResponse[], viewMode: 'quiz taker'| 'quiz reviewer'| 'admin', allStudentAnswerData: quizResponse[], userId: number  }){
   
    type QuestionForShuffle = {questionId:number, response:string }
    
    const [questionAnswers, setQuestionAnswers] =  useState<QuestionForShuffle[]>([]);
    const [shuffledQuestions, setShuffledQuestions] = useState<question[]>([]);
    const [addQuestionIsOpen, setAddQuestionIsOpen] = useState(false)
    const [addQuizRecourseIsOpen, setAddQuizRecourseIsOpen] = useState(false)
    const [quizResources, setQuizResources] = useState<quiz_recourse[]>(); 
    const [addProblemReportIsOpen, setAddProblemReportIsOpen] = useState(false)

    const router = useRouter();
    useEffect(() => {

        const fetchQuizResources = async () => {
            const supabase = await createClient();

            const { data, error } = await supabase
            .from('quiz_recourses').select('*').eq('quiz_id', quizData.id);
            if (error) {
                console.error('Error fetching quiz resources:', error);
            } else {
                setQuizResources(data as quiz_recourse[]);
            }
        };
        fetchQuizResources();
    }, []); 
 let average = 0
 let learnerIds:number[] =[] 
    if(viewMode == 'admin'){
 learnerIds = [... new Set(allStudentAnswerData.map(answer => answer.learner_id))];
const scores = learnerIds.map(learnerId => {
    return calculateScores(quizData, allStudentAnswerData, learnerId)
})
 average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
}

    useMemo(() => {
       
        const shuffled = quizData.questions.map((question) => {
            const options = question.question_false_answers ? [question.question_answer, ...question.question_false_answers] : [question.question_answer];
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
    function choiceSelectHandler(questionId:number, answer:string){
        const filteredAnswers:QuestionForShuffle[] = questionAnswers.filter(answer=> (answer.questionId !== questionId))
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
    function submitHandler(questionAnswers:QuestionForShuffle[], quizId:number){

uploadAnswers(questionAnswers,  quizId);
router.push('/quizzes');
    }

    const letterArray= ['a) ', 'b) ','c) ','d) ','e) ' ]

    const canEditQuiz = () => {
        const quizStartDate = new Date(quizData.opens_at);
        const now = new Date();
        return now < quizStartDate;
    };

    return(
        <div className="max-w-4xl mx-auto p-4">
            <div className="border-b border-gray-200 mb-8">
                <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 pb-4">
                    <h1 className="text-2xl font-bold">{quizData.quiz_name}</h1>
                    <div className="flex gap-4 text-sm text-gray-600">
                        <span>Opens {new Date(quizData.opens_at).toLocaleDateString()}</span>
                        <span>·</span>
                        <span>Due {new Date(quizData.closes_at).toLocaleDateString()}</span>
                    </div>
                </div>

                {viewMode === 'admin' && (
                    <div className="flex flex-wrap items-center gap-4 py-4 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Average:</span>
                            <span className="font-medium">{average}/{quizData.questions.length}</span>
                        </div>
                        <div className="flex gap-3">
                            <button 
                                className="button"
                                onClick={() => addRecourseHandler()}
                            >
                                Add Resource
                            </button>
                            {addQuizRecourseIsOpen && <AddModal dataFunction={addQuizRecourse}  setIsOpen={setAddQuizRecourseIsOpen} relevantId={quizData.id} />}

                            {quizResources && <ResourcesDropdown resources={quizResources} />}
                        </div>
                    </div>
                )}
            </div>

            {/* Existing questions section */}
            {
shuffledQuestions.map((question:question, index) => (
               question.id && 
                <div key={question.id}
                className="border rounded-lg p-4"
                >
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <div>
                                <button 
                                    onClick={()=>reportProblemHandler()}
                                    className="button button-red"
                                >
                                    Report Problem
                                </button> 
                                {addProblemReportIsOpen  && 
                                    <AddModal 
                                        dataFunction={addProblemReport}  
                                        setIsOpen={setAddProblemReportIsOpen} 
                                        relevantId={question.id} 
                                    />
                                }
                                <p>{index + 1}. {question.question_text}</p>
                                <ul key={question.id}>
                                    { question.shuffledOptions && question.shuffledOptions.map((option:string, optionIndex:number) => (
                                        
                                        <li key={optionIndex} 
                                        onClick={() => choiceSelectHandler(question.id!, option)}
                                            className={`cursor-pointer ${questionAnswers.some(answer => 
                                                answer.questionId === question.id && 
                                                answer.response === option) ? 'border border-blue-500' : ''
                                            }`}
                                        >
                                            {letterArray[optionIndex] + option}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {viewMode === 'admin' && (
                            <div className="w-64">
                                <StudentAnswersDropdown 
                                    questionId={question.id}
                                    correctAnswer={quizData.questions[index].question_answer}
                                    learnerIds={learnerIds}
                                    allStudentAnswerData={allStudentAnswerData}
                                />
                            </div>
                        )}
                    </div>

                    {viewMode === 'admin' && (
                        <div className="mt-4 mb-4 border-b pt-1 border-t pt-1">
                            <ul>
                                <li>Reported errors</li>
                                {question.reported_errors?.map((report:errorReport) => (
                                    <div key={report.id}>
                                        <li>reported on {report.created_at}</li> 
                                        <li>{report.report_text}</li>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    )}

                    {viewMode === 'quiz reviewer' && (
                        <p>correct answer {quizData.questions[index].question_answer} your answer {filterForQuestionAnswer(answerData, question.id, userId).answer}</p>
                    )}
                </div>  
            ))}
            {viewMode === 'admin' && canEditQuiz() && (
                <button 
                    onClick={()=>addQuestionHandler()}
                    className="button"
                >
                    Add Question
                </button>
            )}
            {addQuestionIsOpen && <AddModal dataFunction={addQuestion}  setIsOpen={setAddQuestionIsOpen} relevantId={quizData.id} />}
            {/* add logic so this only appears if quiz has not gone live yet */}
           {viewMode == 'quiz taker' && <button 
           onClick={()=> submitHandler(questionAnswers,quizData.id)}
           className="button"
           >Submit Answers</button>}

        </div>
    )
}