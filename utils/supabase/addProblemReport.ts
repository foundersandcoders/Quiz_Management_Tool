import { createClient } from '@/utils/supabase/client';

export default async function addProblemReport(problemData, questionId){
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
        return { success: false, error };
    }

    console.log('Recourse added successfully:', data);
}