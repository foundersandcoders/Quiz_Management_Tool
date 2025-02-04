'use client'
import { quizResponse } from '@/types/supabaseTypes';
import { useState } from 'react';
import filterForQuestionAnswer from '@/utils/filterForQuestionAnswers';

type StudentAnswersDropdownProps = {
    questionId: number;
    correctAnswer: string;
    learnerIds: number[];
    allStudentAnswerData: quizResponse[];
}

export default function StudentAnswersDropdown({ 
    questionId, 
    correctAnswer, 
    learnerIds, 
    allStudentAnswerData 
}: StudentAnswersDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? 'Hide Student Answers' : 'Show Student Answers'}
            </button>

            {isOpen && (
                <ul>
                    <li>Correct answer: {correctAnswer}</li>
                    {learnerIds.map((learnerId) => {
                        const studentAnswer = filterForQuestionAnswer(allStudentAnswerData, questionId, learnerId);
                        return (
                            <li key={learnerId}>
                                {studentAnswer.answer} - {studentAnswer.learners?.name}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
} 