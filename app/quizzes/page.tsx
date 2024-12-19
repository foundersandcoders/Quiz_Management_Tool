import { createClient } from '@/utils/supabase/server';

const Quizzes = async () => {
  const supabase = await createClient();

  const { data: UserInformation } = await supabase.auth.getUser();
  const { data: userData } = await supabase
    .from('learners')
    .select('id,cohort_number')
    .eq('email', UserInformation.user?.email);
  const { data: quizzes } = await supabase
    .from('quizzes')
    .select(
      `
    *,
    quiz_question_learner_answers(learner_id)
    
    `
    )
    .eq('cohort_number', userData[0].cohort_number);
 
  if (!UserInformation) {
    return <div>User not found</div>;
  }
  // console.log('quizquestionLearneranswers quiz 3', quizzes[2].quiz_question_learner_answers)
  // console.log('userData', userData)
  // console.log('filtered results',quizzes?.filter(quiz =>quiz.quiz_question_learner_answers.some((id)=>id.learner_id == userData.id)))
  return (
    <div>
      <p>{userData[0].cohort_number}</p>
<h1>Current Quizzes</h1>
{quizzes.filter(quiz => new Date(quiz.closes_at) > new Date()).map((quiz, index) => {

        return (
          <div key={index}>
            <h1>{quiz.quiz_name}</h1>
            <p>Due date {quiz.closes_at}</p>
          </div>
        );
      })}
<h1>Overdue Quizzes</h1>
{quizzes.filter(quiz => new Date(quiz.closes_at) <= new Date() && quiz.quiz_question_learner_answers.some((id)=>id.learner_id != userData[0].id)).map((quiz, index) => {
        return (
          <div key={index}>
            <h1>{quiz.quiz_name}</h1>
            <p>Due date {quiz.closes_at}</p>
          </div>
        );
      })}
<h1>Completed Quizzes</h1>

      {quizzes?.filter(quiz =>quiz.quiz_question_learner_answers.some((id)=>id.learner_id == userData[0].id)).map((quiz, index) => {
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
