import ButtonWithModalForCohorts from '@/components/ButtonWithModalForCohorts';
import LearnersDropdown from '@/components/LearnerDropdown';
import checkAdmin from '@/utils/supabase/checkAdmin';
import { createClient } from '@/utils/supabase/server';
import QuizDropdown from '@/components/QuizDropdown';

export default async function Cohorts() {
  if(!await checkAdmin()){
    return('page is for admin users')
}
  const supabase = await createClient();
  const { data: Cohorts } = await supabase.from('cohorts').select(`
            *,

            learners(
                *
            ),
            quizzes(*)
        `);
  return (
    <div className='flex flex-col gap-5 '>
      {Cohorts?.map((cohort) => {
        return (
          <div key={cohort.id} className='flex flex-col md:flex-row gap-5'>
            <div>
            <h1>Cohort Number {cohort.number}</h1>
            <p>start date {cohort.start_date}</p>
            <p>end date {cohort.end_date}</p>
            </div>
            <LearnersDropdown learners={cohort.learners} />
            <QuizDropdown quizzes={cohort.quizzes} />
          </div>
        );
      })}

      <ButtonWithModalForCohorts
      buttonText='Add Cohort'
      relevantId={555}
      />
    </div>
  );
}
