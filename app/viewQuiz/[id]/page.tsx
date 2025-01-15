import QuizInterface from '@/components/QuizInterface';
import { createClient } from '@/utils/supabase/server';


export default async function ViewQuiz({ params }: { params: { id: string } }){

    const supabase = await createClient();

    const { data: quizData } = await supabase
    .from('quizzes')
    .select('*, questions:quiz_questions(questions(*))')
    .eq('id', params.id)
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
 console.log('anser data from page', answerData)
return(
    <QuizInterface quizData={flatQuizData} answerData={answerData}/>
)

}