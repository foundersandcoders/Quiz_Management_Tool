"use client"
import uploadQuiz from '@/utils/supabase/uploadQuiz';
import React, { useState } from 'react';
import { question } from '@/types/supabaseTypes';


const AddQuiz: React.FC = () => {
    const [quizName, setQuizName] = useState('');
    const [quizCohort, setQuizCohort] = useState('');
    const [quizStartTime, setStartTime] = useState('');
    const [quizCloseTime, setCloseTime] = useState('');

    const [questions, setQuestions] = useState<question[]>([{ 
        question_text: '', 
        question_answer: '', 
        question_false_answers: ['', '', ''], 
        questionType: 'multiple-choice' // Default question type
    }]);

    const handleQuestionChange = (index: number, field: string, value: string) => {
        const newQuestions = [...questions];
        if (field === 'question_text') {
            newQuestions[index].question_text = value;
        } else if (field === 'question_answer') {
            newQuestions[index].question_answer = value;
        } else if (field === 'questionType') {
            newQuestions[index].questionType = value as 'multiple-choice' | 'code' | 'short-answer';
        } else if (newQuestions[index].question_false_answers) {
            newQuestions[index].question_false_answers[Number(field)] = value;
        }
        setQuestions(newQuestions);
    };

    const addQuestion = () => {
        setQuestions([...questions, { question_text: '', question_answer: '', question_false_answers: ['', '', ''], questionType: 'multiple-choice' }]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
  uploadQuiz(quizName, questions, quizCohort, quizStartTime, quizCloseTime)
    };

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <h1 className="text-2xl font-bold mb-6">Create a Quiz</h1>
                    
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Quiz Name"
                            value={quizName}
                            onChange={(e) => setQuizName(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-gray-400"
                        />
                        <input
                            type="text"
                            placeholder="Cohort Number"
                            value={quizCohort}
                            onChange={(e) => setQuizCohort(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-gray-400"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="datetime-local"
                                placeholder="Start Time"
                                value={quizStartTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-gray-400"
                            />
                            <input
                                type="datetime-local"
                                placeholder="Close Time"
                                value={quizCloseTime}
                                onChange={(e) => setCloseTime(e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-gray-400"
                            />
                        </div>
                    </div>

                    {questions.map((q, index) => (
                        <div key={index} className="mt-6 p-4 border border-gray-200 rounded-md">
                            <input
                                type="text"
                                placeholder="Question"
                                value={q.question_text}
                                onChange={(e) => handleQuestionChange(index, 'question_text', e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-gray-400 mb-4"
                            />
                            <input
                                type="text"
                                placeholder="Correct Answer"
                                value={q.question_answer}
                                onChange={(e) => handleQuestionChange(index, 'question_answer', e.target.value)}
                                required
                                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-gray-400 mb-4"
                            />
                            <select
                                value={q.questionType}
                                onChange={(e) => handleQuestionChange(index, 'questionType', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-gray-400 mb-4"
                            >
                                <option value="multiple-choice">Multiple Choice</option>
                                <option value="code">True/False</option>
                                <option value="short-answer">Short Answer</option>
                            </select>
                            <div className="space-y-3">
                                {q.question_false_answers?.map((wrongAnswer, i) => (
                                    <input
                                        key={i}
                                        type="text"
                                        placeholder={`Wrong Answer ${i + 1}`}
                                        value={wrongAnswer}
                                        onChange={(e) => handleQuestionChange(index, i.toString(), e.target.value)}
                                        required
                                        className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-gray-400"
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                    
                    <div className="flex gap-4 mt-6">
                        <button 
                            type="button" 
                            onClick={addQuestion}
                            className="button"
                        >
                            Add Another Question
                        </button>
                        <button 
                            type="submit"
                            className="button"
                        >
                            Submit Quiz
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddQuiz;