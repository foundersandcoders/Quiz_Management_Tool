import ButtonWithModalForStudent from '@/components/ButtonWithModalForStudent';
import NotesDropdown from '@/components/NotesDropdown';
import { question, quiz, student } from '@/types/supabaseTypes';
import calculateScores from '@/utils/calculateScore';
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


    } catch (err) {
        console.error('Error fetching student data:', err);
    }

    if (!studentData) {
        return 'Error no user detected';
      }

    try {
        type returnDataQuestion= {
            questions:question
        }
        const quizIds = [ ... new Set(studentData?.quiz_question_learner_answers?.map(response => response.quiz_id))];
        const { data: quiz_data } = await supabase 
            .from('quizzes')
            .select('*, questions:quiz_questions(questions(*))')
            .in('id', quizIds);
        quizData = quiz_data?.map(quiz => ({
            ...quiz,
            questions: quiz.questions.map((q:returnDataQuestion) => q.questions)
        }))as quiz [];
        
        
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
    if (!studentData) {
        return 'error student data not defined'; 
    }

    return (
    <div className="container mx-auto p-6">
        <div className="mb-8">
            <h1 className="text-2xl font-bold mb-4 dark:text-white">{studentData.name}</h1>
            <Link href={`/learners`} className="hover:text-blue-600 dark:hover:text-blue-400">
                <p className="text-lg mb-2 dark:text-gray-200">Cohort {studentData.cohort_number}</p>
            </Link>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Contact Info: {studentData.email}</p>
        </div>
        <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Quiz Scores</h2>
            <div className="grid gap-4">
                {quizData?.map((quiz) => (
                            <Link href={`/viewQuiz/${quiz.id}`} className="hover:text-blue-600 dark:hover:text-blue-400">

                    <div key={quiz.id} className="p-4 rounded-lg border dark:border-gray-700">
                        <p className="font-medium mb-2 dark:text-gray-200">Quiz Name: {quiz.quiz_name}</p> 
                        <p className="dark:text-gray-300">Score: {studentData.quiz_question_learner_answers && calculateScores(quiz, studentData.quiz_question_learner_answers, params.id)}</p>
                    </div>
                    </Link>

                ))}
            </div>
        </div>
        <div className='flex flex-col gap-3 border dark:border-gray-700 rounded-lg p-6'>
            <h2 className='text-xl font-semibold mb-2 dark:text-white'>Notes</h2>
            <NotesDropdown notes={notesData} />
            <ButtonWithModalForStudent 
                relevantId={params.id} 
                buttonText={'Add Note'} 
            />
        </div>
    </div>
    )
}
