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
        <form onSubmit={handleSubmit}>
            <h1>Create a Quiz</h1>
            <input
                type="text"
                placeholder="Quiz Name"
                value={quizName}
                onChange={(e) => setQuizName(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Cohort Number"
                value={quizCohort}
                onChange={(e) => setQuizCohort(e.target.value)}
                required
            />
            <input
                type="datetime-local" //maybe local is wrong
                placeholder="Start Time"
                value={quizStartTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
            />
            <input
                type="datetime-local" // maybe local wrong
                placeholder="Close Time"
                value={quizCloseTime}
                onChange={(e) => setCloseTime(e.target.value)}
                required
            />
            {questions.map((q, index) => (
                <div key={index}>
                    <input
                        type="text"
                        placeholder="Question"
                        value={q.question}
                        onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Correct Answer"
                        value={q.correctAnswer}
                        onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
                        required
                    />
                    <select
                        value={q.questionType}
                        onChange={(e) => handleQuestionChange(index, 'questionType', e.target.value)}
                    >
                        <option value="multiple-choice">Multiple Choice</option>
                        <option value="code">True/False</option> 
                        <option value="short-answer">Short Answer</option>
                        {/* types are aspirational  */}
                    </select> 
                    {q.wrongAnswers.map((wrongAnswer, i) => (
                        <input
                            key={i}
                            type="text"
                            placeholder={`Wrong Answer ${i + 1}`}
                            value={wrongAnswer}
                            onChange={(e) => handleQuestionChange(index, i.toString(), e.target.value)}
                            required
                        />
                    ))}
                </div>
            ))}
            <button type="button" onClick={addQuestion}>Add Another Question</button>
            <button type="submit">Submit Quiz</button>
        </form>
    );
};

export default AddQuiz;
