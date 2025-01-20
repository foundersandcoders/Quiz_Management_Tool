import { quiz, quizResponse } from "@/types/supabaseTypes";
import filterForQuestionAnswer from "./filterForQuestionAnswers";

// might not be feeding in external question id or answ
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

// takes a question id and  uses that and the answer data to find a particular students  answer 
//(wont work with allStudent as currently written it assumes one answer exists that matches)
// passing a student ID through all 3 functions cam ,ale it true again that there is only one