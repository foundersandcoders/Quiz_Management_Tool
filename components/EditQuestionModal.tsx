'use client'
import editQuestion from "@/utils/supabase/editQuestion";
import React from "react";
import { useForm } from "react-hook-form";

export default function EditQuestionModal(){
const{register, handleSubmit} = useForm(); // come back here to add default values
function handleRegistration(data){editQuestion(data, 1)}
return(
    <form onSubmit={handleSubmit(handleRegistration)}>
<div>
        <label>Name</label>
        <input {...register('name')} />
      </div>
      <div>
        <label>Email</label>
        <input type="email"  {...register('email')} />
      </div>
      <div>
        <label>Password</label>
        <input type="password"  {...register('password')} />
      </div>
      <button>Submit</button>

    </form>

)

}