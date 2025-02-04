'use client'
import { quiz } from '@/types/supabaseTypes';
import Link from 'next/link';
import { useState } from 'react';

export default function QuizDropdown({ quizzes }: { quizzes: quiz[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Hide Quizzes' : 'Show Quizzes'}
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