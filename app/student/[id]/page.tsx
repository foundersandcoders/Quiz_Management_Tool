import { quiz, student } from '@/types/supabaseTypes';
import calculateScores from '@/utils/calculateScore';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function Student({ params }: { params: { id: number } }){
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

    </div>
)


}
