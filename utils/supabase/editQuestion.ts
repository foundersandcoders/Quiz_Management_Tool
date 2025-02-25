import { FormData } from '@/types/formTypes';
import { question } from '@/types/supabaseTypes';
import { createClient } from '@/utils/supabase/client';

export default async function editQuestion(editedQuestion:FormData, questionId:number){
console.log(editedQuestion)
const formatedQuestion:question = { 
    question_text: editedQuestion.questionText, 
    question_answer: editedQuestion.correctAnswer || '',
    questionType: 'multiple-choice',
    question_false_answers: [ editedQuestion.wrongAnswer1 || '' ,editedQuestion.wrongAnswer2 || '', editedQuestion.wrongAnswer3|| ''] 
}
const supabase = await createClient();
await supabase
.from('questions')
.update({
    question_text: formatedQuestion.question_text,
    question_answer: formatedQuestion.question_answer,
    question_false_answers: formatedQuestion.question_false_answers,
    question_type: formatedQuestion.questionType,
})
.eq('id', questionId);
window.location.reload()

}