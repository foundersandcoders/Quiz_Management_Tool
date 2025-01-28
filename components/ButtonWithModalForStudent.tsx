'use client'
import { useState } from "react"
import AddModal from "./addModal"
import addStudentNote from "@/utils/supabase/addStudentNote"

export default function ButtonWithModalForStudent({  relevantId, buttonText }: {  relevantId: number, buttonText: string }){
    const [isOpen, setIsOpen]= useState(false)
    function openHandler(){
        setIsOpen(true)
    }
    return(
    <div>
        <button onClick={openHandler}>{buttonText}</button>
        {isOpen && <AddModal dataFunction={addStudentNote} setIsOpen={setIsOpen} relevantId={relevantId} />}
    </div>
    )
}