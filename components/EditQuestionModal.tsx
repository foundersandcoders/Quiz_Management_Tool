'use client'
import { question } from "@/types/supabaseTypes";
import editQuestion from "@/utils/supabase/editQuestion";
import React from "react";
import { useForm } from "react-hook-form";

export default function EditQuestionModal({question, setEditQuestionIsOpen}:{question:question, setEditQuestionIsOpen: (isOpen: boolean) => void}){
const { register, handleSubmit } = useForm<{
  questionText: string;
  correctAnswer: string;
  wrongAnswer1: string;
  wrongAnswer2: string;
  wrongAnswer3: string;
}>({
  defaultValues: {
    questionText: question.question_text || '',
    correctAnswer: question.question_answer || '',
    wrongAnswer1: question.question_false_answers?.[0] || '',
    wrongAnswer2: question.question_false_answers?.[1] || '',
    wrongAnswer3: question.question_false_answers?.[2] || ''
  }
}); 
function handleRegistration(data:{ 
  questionText: string;
  correctAnswer: string;
  wrongAnswer1: string;
  wrongAnswer2: string;
  wrongAnswer3: string;
}){if(question.id){editQuestion(data, question.id)}}
return(
  <div className="fixed left-0 top-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none flex justify-center items-center bg-black bg-opacity-50">
  <div className="bg-background max-w-md w-full max-h-[80vh] overflow-y-auto p-6 rounded-lg shadow-lg">
  
    <form className="space-y-4 py-4" onSubmit={handleSubmit(handleRegistration)}>
<div className="space-y-2 flex  gap-2 items-center">
        <label className="align-middle">Question Text</label>
        <textarea required className="border rounded-lg p-4" {...register('questionText')} />
      </div>
      <div className="space-y-2 flex  gap-2 items-center">
      <label>Correct Answer</label>
        <input required type="text" className="border rounded-lg p-4"
  {...register('correctAnswer')} />
      </div>
      <div className="space-y-2 flex  gap-2 items-center">
      <label>Wrong answer 1</label>
        <input required type="text" className="border rounded-lg p-4"  {...register('wrongAnswer1')} />
      </div>
      <div className="space-y-2 flex  gap-2 items-center">
      <label>Wrong answer 2</label>
        <input required type="text" className="border rounded-lg p-4" {...register('wrongAnswer2')} />
      </div>
      <div className="space-y-2 flex  gap-2 items-center">
      <label>Wrong answer 3</label>
        <input required type="text" className="border rounded-lg p-4" {...register('wrongAnswer3')} />
      </div>
      <div className=" flex  gap-2 ">
      <button className="button">Submit</button>
      <button className="button" onClick={() => setEditQuestionIsOpen(false)}>Cancel</button>

      </div>

     
    </form>
    </div>
</div>


)

}