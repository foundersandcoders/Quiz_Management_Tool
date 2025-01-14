import { createClient } from '@/utils/supabase/client';

export default async function checkAdmin() {
    const supabase = await createClient();

    const { data: UserInformation } = await supabase.auth.getUser();
    const { data: userData } = await supabase
    .from('learners')
    .select('id,cohort_number')
    .eq('email', UserInformation.user?.email);
    const { data: cohortData } = await supabase
    .from('cohorts')
    .select('number');

// console.log(cohortData)
    if (UserInformation.user?.email?.includes('@foundersandcoders.com') && cohortData.some(cohortNumber => cohortNumber > userData[0].cohort_number.number)) {
        return true
    }
    else return false
}