export type question = {
    
    id?: number;
    created_at?: string; 
    question_text?: string;
    question_answer: string;
    question_false_answers?: string[]; // Optional array of false answers
    questionType: 'multiple-choice' | 'code' | 'short-answer'; 
    reported_errors?: errorReport[]
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
    learners?: {name:string}
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
export type student = {
    id: number; 
    created_at: string; 
    cohort_number: number; 
    name: string; 
    email: string; 
    quiz_question_learner_answers?: quizResponse[]
}
export type FieldConfig = {
    name: string;
    label: string;
    type: 'short' | 'long';
    defaultValue?: string | number;
    required?: boolean;
    validation?: (value: any) => boolean | string;
  }
  export type errorReport = {
    id: number;
    created_at: string; 
    question_id: number;
    report_text: string; 
}