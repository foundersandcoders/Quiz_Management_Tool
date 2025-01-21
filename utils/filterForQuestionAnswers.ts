import { quizResponse } from "@/types/supabaseTypes"

export default function filterForQuestionAnswer(answerData:quizResponse[], questionId: number, learnerId : number){


  const filteredQuestionData = answerData.filter(data => data.question_id == questionId && data.learner_id == learnerId)


   return filteredQuestionData[0]
 
 }