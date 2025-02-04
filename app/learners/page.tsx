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
    <div>
      {Cohorts.map((cohort) => {
        return (
          <div key={cohort.id}>
            <h1>Cohort Number {cohort.number}</h1>
            <p>start date {cohort.start_date}</p>
            <p>end date {cohort.end_date}</p>
            <LearnersDropdown learners={cohort.learners} />
            <QuizDropdown quizzes={cohort.quizzes} />
          </div>
        );
      })}

      <ButtonWithModalForCohorts
      buttonText='Add Cohort'
      />
    </div>
  );
}
