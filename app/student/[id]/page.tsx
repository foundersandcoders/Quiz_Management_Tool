import ButtonWithModal from '@/components/ButtonWithModal';
import ButtonWithModalForStudent from '@/components/ButtonWithModalForStudent';
import { quiz, student } from '@/types/supabaseTypes';
import calculateScores from '@/utils/calculateScore';
import addStudentNote from '@/utils/supabase/addStudentNote';
import checkAdmin from '@/utils/supabase/checkAdmin';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function Student({ params }: { params: { id: number } }){
    if(!await checkAdmin()){
        return('page is for admin users')
    }
    
    const supabase = await createClient();
    let studentData:student | null = null; 
    let quizData:quiz[] | null = null ;
    try {
        const {data, error} = await supabase
        .from('learners')
        .select(`
                *,
                quiz_question_learner_answers(
                *,
                quizzes(*,quiz_questions(*))
                )
        `)
        .eq('id', params.id)
        .single();
        studentData = data; 


        if (error) {
            throw new Error(`Database error: ${error.message}`);
        }


        // console.log('student data', studentData);
    } catch (err) {
        console.error('Error fetching student data:', err);
    }
    try {
        const quizIds = [ ... new Set(studentData?.quiz_question_learner_answers.map(response => response.quiz_id))];
        const { data: quiz_data } = await supabase
            .from('quizzes')
            .select('*, questions:quiz_questions(questions(*))')
            .in('id', quizIds);
        quizData = quiz_data.map(quiz => ({
            ...quiz,
            questions: quiz.questions.map(q => q.questions)
        }));
        
        
    } catch (err) {
        console.error('Error fetching quiz data:', err);
    }
    const { data: notesData, error: notesError } = await supabase
    .from('learner_notes')
    .select('*')
    .eq('learner_id', params.id);

if (notesError) {
    throw new Error(`Database error fetching notes: ${notesError.message}`);
}
console.log(notesData)
    if (!studentData) {
        return 'error student data not defined'; 
    }

    return (
    <div>
<h1>Name {studentData.name}</h1>
<Link href={`/learners`}><p>Cohort {studentData.cohort_number}</p></Link>
<p>contact info {studentData.email}</p>
<p>quiz scores</p>
{quizData?.map((quiz) =>(
    <div>
   <p>Quiz Name {quiz.quiz_name}</p> 
   
   <p>Score {calculateScores(quiz, studentData.quiz_question_learner_answers, params.id)}</p>
   </div>
))}


<p>Notes</p>
{notesData.map((note) => (
    <div>
                    <p> Date {note.created_at}</p>
                    <p key={note.id}>{note.note_content}</p>

                    </div>
                ))}
<ButtonWithModalForStudent 

    relevantId={params.id} 
    buttonText={'Add Note'} 
/>
    </div>
)


}
