import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

const Quizzes = async () => {
  const supabase = await createClient();

  const { data: UserInformation } = await supabase.auth.getUser();
  const { data: userData } = await supabase
    .from('learners')
    .select('id,cohort_number')
    .eq('email', UserInformation.user?.email);
    if(!userData[0].cohort_number){
return('page is meant for users who are part of a cohort')
    }
  const { data: quizzes }= await supabase
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

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">Open Quizzes</h1>
      <div className="space-y-4">
        {quizzes.filter(quiz => new Date(quiz.opens_at) < new Date() && new Date(quiz.closes_at) > new Date() && !quiz.quiz_question_learner_answers.some((id)=>id.learner_id == userData[0].id)).map((quiz, index) => {
          return (
            <div key={index} className="border rounded-lg p-4">
              <Link href={`/viewQuiz/${quiz.id}`}>
                <h2 className="text-lg font-semibold hover:underline">{quiz.quiz_name}</h2>
              </Link>
              <p className="text-sm mt-2">Due: {new Date(quiz.closes_at).toLocaleDateString()}</p>
            </div>
          );
        })}
      </div>

      <h1 className="text-2xl font-bold">Overdue Quizzes</h1>
      <div className="space-y-4">
        {quizzes.filter(quiz => new Date(quiz.closes_at) <= new Date() && !quiz.quiz_question_learner_answers.some((id)=>id.learner_id == userData[0].id)).map((quiz, index) => {
          return (
            <div key={index} className="border rounded-lg p-4">
              <Link href={`/viewQuiz/${quiz.id}`}>
                <h2 className="text-lg font-semibold hover:underline">{quiz.quiz_name}</h2>
              </Link>
              <p className="text-sm mt-2">Due: {new Date(quiz.closes_at).toLocaleDateString()}</p>
            </div>
          );
        })}
      </div>

      <h1 className="text-2xl font-bold">Completed Quizzes</h1>
      <div className="space-y-4">
        {quizzes?.filter(quiz =>quiz.quiz_question_learner_answers.some((id)=>id.learner_id == userData[0].id)).map((quiz, index) => {
          return (
            <div key={index} className="border rounded-lg p-4">
              <Link href={`/viewQuiz/${quiz.id}`}>
                <h2 className="text-lg font-semibold hover:underline">{quiz.quiz_name}</h2>
              </Link>
              <p className="text-sm mt-2">Due: {new Date(quiz.closes_at).toLocaleDateString()}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Quizzes;
