import { FormData } from '@/types/formTypes';
import { createClient } from '@/utils/supabase/client';
// type CohortData = {
//     cohortNumber: string;
//     startDate: string; 
//     endDate: string;   
// }
export default async function addCohort(formdata:FormData){
    
    const supabase = await createClient();
    try {
        const {  error } = await supabase
        .from('cohorts')
        .insert({
            "number" : formdata.cohortNumber,
            "start_date" : formdata.startDate,
            "end_date" : formdata.endDate
        });

        if (error) {
            throw new Error(error.message); 
        }

    } catch (err) {
        console.error("Error adding cohort:", err); 
    }
}