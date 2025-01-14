import QuizInterface from '@/components/QuizInterface';
import { createClient } from '@/utils/supabase/server';


export default async function ViewQuiz({ params }: { params: { id: string } }){

    const supabase = await createClient();

    const { data: quizData } = await supabase
    .from('quizzes')
    .select('*, questions:quiz_questions(questions(*))')
    .eq('id', params.id)
    .single();

    const flatQuizData = {
        ...quizData,
        questions: quizData.questions.map(q => q.questions)
    }
 
return(
    <QuizInterface quizData={flatQuizData}/>
)

}