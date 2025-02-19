import { quiz, quizResponse } from "@/types/supabaseTypes";
import filterForQuestionAnswer from "./filterForQuestionAnswers";

export default function correctCheck(answerData: quizResponse[], questionId:number, quizData :quiz, learnerId:number){
const learnerAnswer: quizResponse = filterForQuestionAnswer(answerData, questionId, learnerId)
const correctAnswer = quizData.questions.filter(question => question.id ==learnerAnswer.question_id)[0].question_answer
if(correctAnswer == learnerAnswer.answer){
    return true
}

else{
    return false
}

}

