import { createClient } from '@/utils/supabase/client';
import { question } from '@/types/supabaseTypes';
import { FormData } from '@/types/formTypes';

export default async function addQuestion( newQuestion:FormData, quizId: number) {
    const supabase = await createClient();
    
const formatedQuestion:question = { 
    question_text: newQuestion.questionText, 
    question_answer: newQuestion.correctAnswer || '',
    questionType: 'multiple-choice',
    question_false_answers: [ newQuestion.wrongAnswer1 || '' ,newQuestion.wrongAnswer2 || '', newQuestion.wrongAnswer3|| ''] 
}

    const { data: questionData, error: questionError } = await supabase
        .from('questions')
        .insert({
            question_text: formatedQuestion.question_text,
            question_answer: formatedQuestion.question_answer,
            question_false_answers: formatedQuestion.question_false_answers,
            question_type: formatedQuestion.questionType,
        })
        .select()
        .single();

    if (questionError) {
        console.error('Error adding question:', questionError.message);
        return;
    }

    const { data: joinData, error: joinError } = await supabase
        .from('quiz_questions')
        .insert({
            quiz_id: quizId,
            question_id: questionData.id,
        });

    if (joinError) {
        console.error('Error linking question to quiz:', joinError.message);
    } else {
        console.log('Question added to quiz successfully:', joinData);
    }
    window.location.reload()

}
