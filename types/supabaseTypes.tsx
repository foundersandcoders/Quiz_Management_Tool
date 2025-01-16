export type question = {
    
    id?: number;
    created_at?: string; 
    question_text?: string;
    question_answer: string;
    question_false_answers?: string[]; // Optional array of false answers
    questionType: 'multiple-choice' | 'code' | 'short-answer'; 
}
export type answer = {
questionId: number;
response: string;

}
export type quizResponse = {
    id: number;
    created_at: string; 
    quiz_id: number;
    question_id: number;
    learner_id: number;
    answer: string;
}
// expand question type so that we can define quizzes as inclouding an array of question types
export type quiz = {
    id: number;
    created_at: string;
    quiz_name: string; 
    opens_at: string; 
    closes_at: string; 
    cohort_number: number;
    questions: question[]; 
}