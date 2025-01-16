import QuizInterface from '@/components/QuizInterface';
import { quizResponse } from '@/types/supabaseTypes';
import checkAdmin from '@/utils/supabase/checkAdmin';
import { createClient } from '@/utils/supabase/server';


export default async function ViewQuiz({ params }: { params: { id: string } }){

    const supabase = await createClient();

    const { data: quizData } = await supabase
    .from('quizzes')
    .select('*, questions:quiz_questions(questions(*))')
    .eq('id',  params.id)
    .single();
    const { data: UserInformation } = await supabase.auth.getUser();
    const { data: userData } = await supabase
    .from('learners')
    .select('id')
    .eq('email', UserInformation.user?.email);
    const { data: answerData } = await supabase
    .from('quiz_question_learner_answers')
    .select('*')
    .eq('learner_id', userData[0].id );

    const flatQuizData = {
        ...quizData,
        questions: quizData.questions.map(q => q.questions)
    }

let viewMode ='quiz taker'
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

return(
    <QuizInterface quizData={flatQuizData} answerData={answerData} viewMode={viewMode}/>
)

}