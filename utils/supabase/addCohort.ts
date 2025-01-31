import { createClient } from '@/utils/supabase/client';

export default async function addCohort(cohortData){
    const supabase = await createClient();
    try {
        const { data, error } = await supabase
        .from('cohorts')
        .insert({
            "number" : cohortData.cohortNumber,
            "start_date" : cohortData.startDate,
            "end_date" : cohortData.endDate
        });

        if (error) {
            throw new Error(error.message); 
        }

    } catch (err) {
        console.error("Error adding cohort:", err); 
    }
}