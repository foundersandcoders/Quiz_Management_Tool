import { NextResponse } from "next/server";
import { createClient } from '@/utils/supabase/server';
import sendEmail from "@/utils/sendEmail";
import { quiz } from "@/types/supabaseTypes";

 


export async function GET(request) {
  const supabase = await createClient();
  const { data: quizzes } = await supabase.from('quizzes').select(`*,cohorts(learners(email))`);
 // bring in date checks make a quiz that starts today and one that ends today to test
  
try{

  quizzes?.map((quiz:quiz)=>{
let emailArray:string[] = []

quiz.cohorts.learners.map((email)=>{emailArray.push(email.email)})
 
 
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0]; // Only keep the date part (YYYY-MM-DD)
    const closesAtDate = new Date(quiz.closes_at);
    const opensAtDate = new Date(quiz.opens_at);
    const formattedClosesAt = closesAtDate.toISOString().split('T')[0]; // Only keep the date part (YYYY-MM-DD)
    const formattedOpensAt = opensAtDate.toISOString().split('T')[0]; // Only keep the date part (YYYY-MM-DD)
    console.log(formattedToday,formattedOpensAt )
    if (formattedOpensAt === formattedToday){
 sendEmail(quiz.quiz_name,emailArray, 'quizOpening')
 
    }
    if (formattedClosesAt === formattedToday){
      sendEmail(quiz.quiz_name,emailArray,'quizClosing' )
          }
  
          emailArray = []
        })
  return NextResponse.json(
    { message: 'Email Sent Successfully'  },
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