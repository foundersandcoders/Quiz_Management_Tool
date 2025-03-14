import { quiz, quizResponse } from "@/types/supabaseTypes";
import correctCheck from "./correctCheck";

export default function calculateScores(quizData:quiz, answerData: quizResponse[], learnerId: number){
  let score = 0
    quizData.questions.forEach(question => {
     if(question.id && correctCheck(answerData, question.id, quizData, learnerId)) {score++}
    });
    return score
}
