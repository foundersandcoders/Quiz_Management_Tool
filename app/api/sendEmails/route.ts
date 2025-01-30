import { NextResponse } from "next/server";
import { createClient } from '@/utils/supabase/server';
import sendEmail from "@/utils/sendEmail";
import { quiz } from "@/types/supabaseTypes";

 


export async function GET(request) {
  const supabase = await createClient();
  const { data: quizzes } = await supabase.from('quizzes').select(`*,cohorts(learners(email))`);
  //need for loop to do for each quiz
// now need an array containing the emails compress into function that takes quiz name start and end date and array of learners
// then loop through quizzes inserting each

  //  return NextResponse.json(quizzes, { status: 200 });
  
try{
  quizzes?.map((quiz:quiz)=>{
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0] + 'T00:00:00.000Z'; // Adjusting to match the format
    const closesAtDate = new Date(quiz.closes_at);
    const opensAtDate = new Date(quiz.opens_at);
// lets come back to this start with getting it to handle an array we might also want to shift it to be a day before end date
//     if (closesAtDate.toISOString() === formattedToday){
// sendEmail(quiz.quiz_name,['anderssji94@gmail.com'],'quizClosing' )
//     }
//     if (closesAtDate.toISOString() === formattedToday){
//       sendEmail(quiz.quiz_name,['anderssji94@gmail.com'],'quizClosing' )
//           }
//   })
  return NextResponse.json(
    { message: 'Email Sent Successfully' },
    { status: 200 }
  );
} catch (error) {
  return NextResponse.json(
    { message: 'Failed to Send Email', error },
    { status: 500 }
  );
}
  
  // return NextResponse.json({ message: "Hello World" }, { status: 200 });

}