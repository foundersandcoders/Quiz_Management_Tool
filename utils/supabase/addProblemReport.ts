import { FormData } from '@/types/formTypes';
import { createClient } from '@/utils/supabase/client';

export default async function addProblemReport(problemData:FormData, questionId:number){
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('reported_errors')
        .insert([
            {
                report_text: problemData.reportText,
                question_id: questionId
    
            }
        ]);

    if (error) {
        console.error('Error inserting recourse:', error);
    }

    console.log('Recourse added successfully:', data);
}