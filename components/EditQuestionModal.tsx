'use client'
import editQuestion from "@/utils/supabase/editQuestion";
import React from "react";
import { useForm } from "react-hook-form";

export default function EditQuestionModal({questionId}:{questionId:number}){
const{register, handleSubmit} = useForm(); // come back here to add default values
function handleRegistration(data){editQuestion(data, questionId)}
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