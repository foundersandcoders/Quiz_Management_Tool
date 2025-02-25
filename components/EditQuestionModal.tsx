'use client'
import { question } from "@/types/supabaseTypes";
import editQuestion from "@/utils/supabase/editQuestion";
import React from "react";
import { useForm } from "react-hook-form";

export default function EditQuestionModal({question}:{question:question}){
const{register, handleSubmit} = useForm({defaultValues:{
  questionText: question.question_text,
  correctAnswer: question.question_answer,
  wrongAnswer1: question.question_false_answers?.[0] || '',
  wrongAnswer2: question.question_false_answers?.[1] || '',
  wrongAnswer3: question.question_false_answers?.[2] || ''


}}); 
function handleRegistration(data){editQuestion(data, question.id)}
return(
    <form onSubmit={handleSubmit(handleRegistration)}>
<div>
        <label>Question Text</label>
        <textarea {...register('questionText')} />
      </div>
      <div>
        <label>Correct Answer</label>
        <input type="text"  {...register('correctAnswer')} />
      </div>
      <div>
        <label>Wrong answer 1</label>
        <input type="text"  {...register('wrongAnswer1')} />
      </div>
      <div>
        <label>Wrong answer 2</label>
        <input type="text"  {...register('wrongAnswer2')} />
      </div>
      <div>
        <label>Wrong answer 3</label>
        <input type="text"  {...register('wrongAnswer3')} />
      </div>
      <button>Submit</button>

    </form>

)

}