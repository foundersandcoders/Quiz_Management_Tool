import { FormData } from '@/types/formTypes';
import { createClient } from '@/utils/supabase/client';

export default async function addQuizRecourse(recourseData:FormData, quizId: number) {
  
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('quiz_recourses')
        .insert([
            {
                recourse_name: recourseData.name,
                recourse_link: recourseData.link,
                quiz_id: quizId
            }
        ]);

    if (error) {
        console.error('Error inserting recourse:', error);
    }

    console.log('Recourse added successfully:', data);
}