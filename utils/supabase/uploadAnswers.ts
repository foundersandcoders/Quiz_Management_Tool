import { createClient } from '@/utils/supabase/client';
import { answer } from '@/types/supabaseTypes';

export default async function uploadAnswers(questionAnswers: answer[], quizId: number){
    const supabase = await createClient();
    const { data: UserInformation } = await supabase.auth.getUser();
    const { data: userId } = await supabase
      .from('learners')
      .select('id')
      .eq('email', UserInformation.user?.email)
      .single();
questionAnswers.map(async(answer)=>{
    const { data: answerData, error: answerError } = await supabase
    .from('quiz_question_learner_answers')
    .insert({ "quiz_id": quizId, "question_id": answer.questionId, "learner_id": userId?.id, 'answer': answer.response })
    .select();
  if (answerError) {
    console.error('Insertion error:', answerError.message);
  } else {
    console.log('Insertion successful:', answerData);
  }

})

    
}