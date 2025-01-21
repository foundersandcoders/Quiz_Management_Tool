import { quiz, quizResponse } from "@/types/supabaseTypes";
import correctCheck from "./correctCheck";

export default function calculateScores(quizData:quiz, answerData: quizResponse[], learnerId: number){
  let score = 0
    quizData.questions.forEach(question => {
      if(correctCheck(answerData, question.id, quizData, learnerId)) {score++}
    });
    return score
}
//takes the list of questions in quiz data then passes does a for each 
//that for each question passes the question id and all relevant data
// to correct check