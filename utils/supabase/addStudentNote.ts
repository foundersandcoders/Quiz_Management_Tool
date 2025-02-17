import { FormData } from '@/types/formTypes';
import { createClient } from '@/utils/supabase/client';

// type NoteData= {
//     content:string
// }
export default async function addStudentNote(formData:FormData, relevantId:number) {
//    const  NoteData = formData as NoteData
    const supabase = await createClient();
     await supabase
    .from('learner_notes')
    .insert({
        "note_content" : formData.content,
        "learner_id" : relevantId
    })
    .select()
    .single();
 window.location.reload()
}