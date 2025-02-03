import ButtonWithModalForCohorts from '@/components/ButtonWithModalForCohorts';
import { quiz } from '@/types/supabaseTypes';
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
            <div>
              <h2>Learners:</h2>
              {cohort.learners.map(
                (
                  learner 
                ) => (
                  <div key={learner.id}>
                    {' '}
                   
                   <Link href={`/student/${learner.id}`}><p>Name: {learner.name}</p></Link> 
                    <p>Email: {learner.email}</p>
                  </div>
                )
              )}
               <h2>Quizzes:</h2>
              {cohort.quizzes.map((quiz:quiz)=>(
                <div key={quiz.id}>
                  <Link href={`/viewQuiz/${quiz.id}`}>{quiz.quiz_name}</Link>
                  
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
