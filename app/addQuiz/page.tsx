"use client"
import uploadQuiz from '@/utils/supabase/uploadQuiz';
import React, { useState } from 'react';
import { question } from '@/types/supabaseTypes';


const AddQuiz: React.FC = () => {
    const [quizName, setQuizName] = useState('');
    const [quizCohort, setQuizCohort] = useState('');//cohort number
    const [quizStartTime, setStartTime] = useState('');// open time
    const [quizCloseTime, setCloseTime] = useState('');//close time

    const [questions, setQuestions] = useState<question[]>([{ 
        question: '', 
        correctAnswer: '', 
        wrongAnswers: ['', '', ''], 
        questionType: 'multiple-choice' // Default question type
    }]);

    const handleQuestionChange = (index: number, field: string, value: string) => {
        const newQuestions = [...questions];
        if (field === 'question') {
            newQuestions[index].question = value;
        } else if (field === 'correctAnswer') {
            newQuestions[index].correctAnswer = value;
        } else if (field === 'questionType') {
            newQuestions[index].questionType = value; // Update question type
        } else {
            newQuestions[index].wrongAnswers[Number(field)] = value;
        }
        setQuestions(newQuestions);
    };

    const addQuestion = () => {
        setQuestions([...questions, { question: '', correctAnswer: '', wrongAnswers: ['', '', ''], questionType: 'multiple-choice' }]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
  uploadQuiz(quizName, questions, quizCohort, quizStartTime, quizCloseTime)
    };

    return (
        <div className="min-h-screen p-8 max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
                <h1 className="text-2xl font-semibold mb-6">Create a Quiz</h1>
                
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Quiz Name"
                        value={quizName}
                        onChange={(e) => setQuizName(e.target.value)}
                        required
                        className="p-2 border rounded w-full"
                    />
                    <input
                        type="text"
                        placeholder="Cohort Number"
                        value={quizCohort}
                        onChange={(e) => setQuizCohort(e.target.value)}
                        required
                        className="p-2 border rounded w-full"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="datetime-local"
                        placeholder="Start Time"
                        value={quizStartTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                        className="p-2 border rounded w-full"
                    />
                    <input
                        type="datetime-local"
                        placeholder="Close Time"
                        value={quizCloseTime}
                        onChange={(e) => setCloseTime(e.target.value)}
                        required
                        className="p-2 border rounded w-full"
                    />
                </div>

                {questions.map((q, index) => (
                    <div key={index} className="p-4 border rounded space-y-4">
                        <h2 className="font-medium">Question {index + 1}</h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Question"
                                value={q.question}
                                onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                                required
                                className="p-2 border rounded w-full"
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Correct Answer"
                                    value={q.correctAnswer}
                                    onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
                                    required
                                    className="p-2 border rounded w-full"
                                />
                                <select
                                    value={q.questionType}
                                    onChange={(e) => handleQuestionChange(index, 'questionType', e.target.value)}
                                    className="p-2 border rounded w-full"
                                >
                                    <option value="multiple-choice">Multiple Choice</option>
                                    <option value="code">True/False</option>
                                    <option value="short-answer">Short Answer</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                {q.wrongAnswers.map((wrongAnswer, i) => (
                                    <input
                                        key={i}
                                        type="text"
                                        placeholder={`Wrong Answer ${i + 1}`}
                                        value={wrongAnswer}
                                        onChange={(e) => handleQuestionChange(index, i.toString(), e.target.value)}
                                        required
                                        className="p-2 border rounded w-full"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}

                <div className="flex gap-4 justify-end">
                    <button
                        type="button"
                        onClick={addQuestion}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Add Another Question
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Submit Quiz
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddQuiz;
