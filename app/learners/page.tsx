import { createClient } from '@/utils/supabase/server';
import { useState } from 'react';

export default async function Cohorts() {
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
  console.log(Cohorts);
  return (
    <div>
      {Cohorts.map((cohort, index) => {
        return (
          <div>
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
                    <p>Name: {learner.name}</p>
                    <p>Email: {learner.email}</p>
                  </div>
                )
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
