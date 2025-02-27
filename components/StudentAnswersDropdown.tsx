'use client'
import { quizResponse } from '@/types/supabaseTypes';
import { useState } from 'react';
import filterForQuestionAnswer from '@/utils/filterForQuestionAnswers';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

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
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="dropdown-button"
            >
                <span>{isOpen ? 'Hide Student Answers' : 'Show Student Answers'}</span>
                <ChevronDownIcon className={`dropdown-icon ${isOpen ? 'dropdown-icon-open' : ''}`} />
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