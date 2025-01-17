import { quizResponse } from "@/types/supabaseTypes"

export default function filterForQuestionAnswer(answerData:quizResponse[], questionId: number, learnerId : number){
    console.log('answer data', answerData)
    console.log('questionId', questionId) // Log questionId
    console.log('learnerId', learnerId)   // Log learnerId
  const filteredQuestionData = answerData.filter(data => data.question_id === questionId && data.learner_id === learnerId)


   
   return filteredQuestionData[0]
 
 }