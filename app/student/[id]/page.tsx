import { createClient } from "@supabase/supabase-js";

export default async function Student({ params }: { params: { id: string } }){
    const supabase = createClient();

    const {data: studentData } = await supabase
    .from('learners')
    .select('*')
    .eq('id',  params.id)
    .single();
}