import QuizInterface from '@/components/QuizInterface';
import { quizResponse, returnDataQuestion } from '@/types/supabaseTypes';
import checkAdmin from '@/utils/supabase/checkAdmin';
import { createClient } from '@/utils/supabase/server';


export default async function ViewQuiz({ params }: { params: { id: string } }){

    const supabase = await createClient();

    const { data: quizData } = await supabase
    .from('quizzes')
    .select('*, questions:quiz_questions(questions(*, reported_errors(*)))')
    .eq('id',  params.id)
    .single();
    
    const { data: UserInformation } = await supabase.auth.getUser();
    const { data: userData } = await supabase
    .from('learners')
    .select('id')
    .eq('email', UserInformation.user?.email);

    if (!userData) {
        return 'Error no user detected';
      }
    const { data: answerData  } = await supabase // should retitle as user answer data for clarity
    .from('quiz_question_learner_answers')
    .select('*')
    .eq('learner_id', userData[0].id ) 
    const flatQuizData = {
        ...quizData,
        questions: quizData.questions.map((q: returnDataQuestion) => q.questions)
    }
let viewMode: "quiz taker" | "quiz reviewer" | "admin"  ='quiz taker'
     function completedCheck(answerData: quizResponse[] | null){

        return answerData?.some(quiz => quiz.quiz_id == quizData.id) || false;
    
    }
     async function determinMode() {
    if( completedCheck(answerData)){
        viewMode ='quiz reviewer';}
    if(await checkAdmin()){
       viewMode ='admin';}
       
    }
    await determinMode();
    let allStudentAnswerData ;
if (viewMode == 'admin'){
   allStudentAnswerData  = await supabase
    .from('quiz_question_learner_answers')
    .select('*,learners(name)')
    .eq('quiz_id', params.id);
    
}// note is it more efficient to always do this then filter down to the use for the userAnswers
return(
    <QuizInterface quizData={flatQuizData} answerData={answerData as quizResponse[]} viewMode={viewMode} allStudentAnswerData={allStudentAnswerData?.data as quizResponse[]} userId={userData[0].id}/>
)

}