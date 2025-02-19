import { createClient } from '@/utils/supabase/client';
import { question } from '@/types/supabaseTypes';

export default async function uploadQuiz(quizName: string, questionArray: question[], quizCohort: string, quizStartTime: string, quizCloseTime: string){
    const supabase = await createClient();

const { data: quizData, error: quizError } = await supabase
    .from('quizzes')
    .insert({ "quiz_name": quizName, "opens_at": quizStartTime, "closes_at": quizCloseTime, 'cohort_number': quizCohort })
    .select()
    .single();
  if (quizError) {
    console.error('Insertion error:', quizError.message);
  } else {
    console.log('Insertion successful:', quizData);
  }
questionArray.forEach(async (question)=>{
  const { data: questionData, error: questionError } = await supabase
    .from('questions')
    .insert({ "question_text": question.question_text, "question_answer": question.question_answer, "question_false_answers": question.question_false_answers, 'question_type': question.questionType })
    .select()
    .single();

   
  if (questionError) {
    console.error('Insertion error:', questionError.message);
  } else {
    console.log('Insertion successful:', questionData);
  }
  const { data: joinData, error: joinError } = await supabase
    .from('quiz_questions')
    .insert({ "quiz_id": quizData.id, "question_id": questionData.id, });
  if (joinError) {
    console.error('Insertion error:', joinError.message);
  } else {
    console.log('Insertion successful:', joinData);
  }
}
)
}