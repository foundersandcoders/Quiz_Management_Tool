import { createClient } from '@/utils/supabase/client';
import { question } from '@/types/supabaseTypes';

export default async function uploadQuiz(quizName: string, questionArray: question[], quizCohort: string, quizStartTime: string, quizCloseTime: string){
    const supabase = await createClient();

console.log('quiz name ', quizName, ' question array ', questionArray, ' quiz cohort ', quizCohort, ' quiz start time ', quizStartTime, ' quiz close time ', quizCloseTime);
const { data: quizData, error: quizError } = await supabase
    .from('quizzes')
    .insert({ "quiz_name": quizName, "opens_at": quizStartTime, "closes_at": quizCloseTime, 'cohort_number': quizCohort })
    .select()
    .single();
  if (quizError) {
    console.error('Insertion error:', quizError.message);
    // Optionally, return an error response or handle it as needed
  } else {
    console.log('Insertion successful:', quizData);
  }
questionArray.forEach(async (question)=>{
  const { data: questionData, error: questionError } = await supabase
    .from('questions')
    .insert({ "question_text": question.question_text, "question_answer": question.correctAnswer, "question_false_answers": question.wrongAnswers, 'question_type': question.questionType })
    .select()
    .single();

   
  if (questionError) {
    console.error('Insertion error:', questionError.message);
    // Optionally, return an error response or handle it as needed
  } else {
    console.log('Insertion successful:', questionData);
  }
  const { data: joinData, error: joinError } = await supabase
    .from('quiz_questions')
    .insert({ "quiz_id": quizData.id, "question_id": questionData.id, });
  if (joinError) {
    console.error('Insertion error:', joinError.message);
    // Optionally, return an error response or handle it as needed
  } else {
    console.log('Insertion successful:', joinData);
  }
}
)
}