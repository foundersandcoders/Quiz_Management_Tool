export type question = {
    
    id?: number;
    created_at?: string; 
    question_text?: string;
    question_answer: string;
    question_false_answers?: string[]; // Optional array of false answers
    questionType: 'multiple-choice' | 'code' | 'short-answer'; 
    reported_errors?: errorReport[];
    shuffledOptions?: string []
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

export type quiz = {
    id: number;
    created_at: string;
    quiz_name: string; 
    opens_at: string; 
    closes_at: string; 
    cohort_number: number;
    questions: question[]; 
    cohorts?:{
        learners:[{email:string}]
    }
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
    type: 'short' | 'long' | 'date';
    defaultValue?: string | number;
    required?: boolean;
  }
  export type errorReport = {
    id: number;
    created_at: string; 
    question_id: number;
    report_text: string; 
}
export type learner_notes = {
    id: number;
    created_at: string;
    learner_id: number;
    note_content: string;
}
export type quiz_recourse = {
    id: number;
    created_at: string;
    recourse_name: string;
    recourse_link: string;
    quiz_id: number;
}

export  type returnDataQuestion= {
    questions:question
}