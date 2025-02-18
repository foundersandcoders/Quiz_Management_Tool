import { NextResponse } from "next/server";
import { createClient } from '@/utils/supabase/server';
import sendEmail from "@/utils/sendEmail";
import { quiz } from "@/types/supabaseTypes";

 


export async function GET() {
  const supabase = await createClient();
  const { data: quizzes } = await supabase.from('quizzes').select(`*,cohorts(learners(email))`);
 // bring in date checks make a quiz that starts today and one that ends today to test
 const openClosesArray:string[]=[]

 try{

   quizzes?.map((quiz:quiz)=>{
let emailArray:string[] = []
if(quiz.cohorts){ 
  quiz.cohorts.learners.map((email)=>{emailArray.push(email.email)})
}
 
 
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0]; 
    const closesAtDate = new Date(quiz.closes_at);
    const opensAtDate = new Date(quiz.opens_at);
    const formattedClosesAt = closesAtDate.toISOString().split('T')[0]; 
    const formattedOpensAt = opensAtDate.toISOString().split('T')[0]; 
    openClosesArray.push(formattedClosesAt)
    openClosesArray.push(formattedOpensAt)
    if (formattedOpensAt === formattedToday){
  sendEmail(quiz.quiz_name,emailArray, 'quizOpening')
 
    }
    if (formattedClosesAt === formattedToday){
      sendEmail(quiz.quiz_name,emailArray,'quizClosing' )
          }
  
          emailArray = []
        })
        const testToday = new Date();
    const formattedTestToday = testToday.toISOString().split('T')[0]; 
  return NextResponse.json(
    { message: `Email Sent Successfully,Quiz name ${quizzes?.[0]?.quizName || 'quiz undefined'},today ${formattedTestToday}, open and closes dates ${openClosesArray}`  },
    { status: 200 }
  );
} catch (error) {
  return NextResponse.json(
    { message: 'Failed to Send Email', error },
    { status: 500 }
  );
}
  
// can try using promises 
}