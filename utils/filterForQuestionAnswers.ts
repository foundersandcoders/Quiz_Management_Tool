import { quizResponse } from "@/types/supabaseTypes"

export default function filterForQuestionAnswer(answerData:quizResponse[], questionId: number){
    const filteredQuestionData = answerData.filter(data => data.question_id === questionId)


   
   return filteredQuestionData[0]
 
 }