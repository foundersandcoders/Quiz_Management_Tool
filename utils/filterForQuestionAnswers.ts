import { quizResponse } from "@/types/supabaseTypes"

export default function filterForQuestionAnswer(answerData:quizResponse[], questionId: number, learnerId : number){
    console.log('answer data', answerData)

  const filteredQuestionData = answerData.filter(data => data.question_id === questionId && data.learner_id === learnerId)
// console.log('question ID', questionId)
// console.log('learner ID', learnerId)


    // console.log(filteredQuestionData)

   
   return filteredQuestionData[0]
 
 }