import { quiz, quizResponse } from "@/types/supabaseTypes";
import correctCheck from "./correctCheck";

export default function calculateScores(quizData:quiz, answerData: quizResponse[]){
    let score = 0
    quizData.questions.forEach(question => {
      if(correctCheck(answerData, question.id, quizData)) {score++}
        
    });
    return score
}