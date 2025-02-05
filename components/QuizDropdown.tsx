'use client'
import { quiz } from '@/types/supabaseTypes';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';

export default function QuizDropdown({ quizzes }: { quizzes: quiz[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="dropdown-button"
      >
        {isOpen ? 'Hide Quizzes' : 'Show Quizzes'}
        <ChevronDownIcon className={`dropdown-icon ${isOpen ? 'dropdown-icon-open' : ''}`} />

      </button>
      
      {isOpen && (
        <div>
          <ul>
            {quizzes.map((quiz) => (
              <li key={quiz.id}>
                <Link
                  href={`/viewQuiz/${quiz.id}`}
                >
                  {quiz.quiz_name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 