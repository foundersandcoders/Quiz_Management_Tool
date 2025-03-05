import { quiz, quizResponse } from "@/types/supabaseTypes";
import calculateScores from "@/utils/calculateScore";
const testQuizData:quiz = {
    id: 1,
    created_at: '',
    quiz_name: '', 
    opens_at: '',
    closes_at: '',
    cohort_number: 1,
    questions: [{
    
        id: 1,
        created_at: 'string',
        question_text: 'string',
        question_answer: 'correct',
        question_false_answers: ['wrong1', 'wrong 2', 'wrong 3'],
        questionType: "multiple-choice",

    }]
}

const testAnswerData:quizResponse[]= [{
    id: 1,
    created_at: "string",
    quiz_id: 1,
    question_id: 1,
    learner_id: 1,
    answer: 'correct',
}]

const testLearnerId:number = 1;

test( 'scores the learner 1s quiz as 1', () =>{
    expect(calculateScores(testQuizData, testAnswerData, testLearnerId)).toBe(1)
} )