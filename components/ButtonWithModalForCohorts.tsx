'use client'
import { useState } from "react"
import AddModal from "./addModal"
import addCohort from "@/utils/supabase/addCohort"

export default function ButtonWithModalForCohorts({  relevantId, buttonText }: {  relevantId?: number, buttonText: string }){
    const [isOpen, setIsOpen]= useState(false)
    function openHandler(){
        setIsOpen(true)
    }
    return(
    <div>
        <button onClick={openHandler}>{buttonText}</button>
        {isOpen && <AddModal dataFunction={addCohort} setIsOpen={setIsOpen} relevantId={relevantId} />}
    </div>
    )
}