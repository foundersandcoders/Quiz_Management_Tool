import { createClient } from '@/utils/supabase/client';

export default async function addStudentNote(note , studentId) {
    const supabase = await createClient();
    const { data } = await supabase
    .from('learner_notes')
    .insert({
        "note_content" : note.content,
        "learner_id" : studentId
    })
    .select()
    .single();

}