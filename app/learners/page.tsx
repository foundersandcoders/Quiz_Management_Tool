import ButtonWithModalForCohorts from '@/components/ButtonWithModalForCohorts';
import checkAdmin from '@/utils/supabase/checkAdmin';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { useState } from 'react';

export default async function Cohorts() {
  if(!await checkAdmin()){
    return('page is for admin users')
}
  const supabase = await createClient();
  const { data: Cohorts } = await supabase.from('cohorts').select(`
            *,
            learners(
                *,
                quiz_question_learner_answers(
                *,
                quizzes(*),
                questions(*)
                )
            )
        `);
  return (
    <div>
      {Cohorts.map((cohort) => {
        return (
          <div key={cohort.id}>
            <h1>Cohort Number {cohort.number}</h1>
            <p>start date {cohort.start_date}</p>
            <p>end date {cohort.end_date}</p>
            <div>
              <h2>Learners:</h2>
              {cohort.learners.map(
                (
                  learner // Map through learners
                ) => (
                  <div key={learner.id}>
                    {' '}
                    {/* Add a key for each learner */}
                   <Link href={`/student/${learner.id}`}><p>Name: {learner.name}</p></Link> 
                    <p>Email: {learner.email}</p>
                  </div>
                )
              )}
            </div>
          </div>
        );
      })}

      <ButtonWithModalForCohorts
      buttonText='Add Cohort'
      />
    </div>
  );
}
