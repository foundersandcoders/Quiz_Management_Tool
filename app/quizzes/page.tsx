import { createClient } from '@/utils/supabase/server';
import { data } from 'autoprefixer';

const Quizzes = async () => {
  const supabase = await createClient();

  const { data: UserInformation } = await supabase.auth.getUser();
  const { data: userCohort } = await supabase
    .from('learners')
    .select('cohort_number')
    .eq('email', UserInformation.user?.email);
  const { data: quizzes } = await supabase
    .from('quizzes')
    .select(
      `
    *,
    quiz_questions(*)
    
    `
    )
    .eq('cohort_number', userCohort[0].cohort_number);
  console.log('userCohort', userCohort[0].cohort_number);
  console.log('quizzes', quizzes);
  if (!UserInformation) {
    return <div>User not found</div>;
  }
  return (
    <div>
      <p>{userCohort[0].cohort_number}</p>

      {quizzes.map((quiz, index) => {
        return (
          <div key={index}>
            <h1>{quiz.quiz_name}</h1>
            <p>Due date {quiz.closes_at}</p>
          </div>
        );
      })}
    </div>
  );
};
export default Quizzes;
