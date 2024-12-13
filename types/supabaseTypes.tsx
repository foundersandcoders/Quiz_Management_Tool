export type question = {
    question: string;
    correctAnswer: string;
    wrongAnswers: string[];
    questionType: 'multiple-choice' | 'code' | 'short-answer'; 
}

