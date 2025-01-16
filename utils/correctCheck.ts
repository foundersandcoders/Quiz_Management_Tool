import { quiz, quizResponse } from "@/types/supabaseTypes";
import filterForQuestionAnswer from "./filterForQuestionAnswers";

// might not be feeding in external question id or answ
export default function correctCheck(answerData: quizResponse[], questionId:number, quizData :quiz){
const learnerAnswer: quizResponse = filterForQuestionAnswer(answerData, questionId)
const correctAnswer = quizData.questions.filter(question => question.id ==learnerAnswer.question_id)[0].question_answer
if(correctAnswer == learnerAnswer.answer){
    return true
}

else{
    return false
}
// make a type and then use this to find right question
// change how filter works so it gives back more then the answer and then where its used in component change so that it uses answer here we use the question Id
}