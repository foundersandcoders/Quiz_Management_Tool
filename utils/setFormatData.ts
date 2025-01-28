import { FieldConfig } from "@/types/supabaseTypes";
import addQuestion from "./supabase/addQuestion";
import addStudentNote from "./supabase/addStudentNote";
import addQuizRecourse from "./supabase/addQuizRecourse";
import addProblemReport from "./supabase/addProblemReport";

export function setDefaultFormData(dataFunction) {
    let defaultFormData: FieldConfig[] = [];
    switch (dataFunction) {
        case addQuestion: {
            defaultFormData = [
                {
                    label: "Question Text",
                    name: "questionText",
                    type: 'long',
                    required: true
                },
                {
                    label: "Correct Answer",
                    name: "correctAnswer",
                    type: 'short',
                    required: true
                },
                {
                    label: "Wrong Answer 1",
                    name: "wrongAnswer1",
                    type: 'short',
                    required: true
                },
                {
                    label: "Wrong Answer 2",
                    name: "wrongAnswer2",
                    type: 'short',
                    required: true
                },
                {
                    label: "Wrong Answer 3",
                    name: "wrongAnswer3",
                    type: 'short',
                    required: true
                }
            ];
        }
        break;
        case addStudentNote:{
defaultFormData = [
    {
        label: "Note",
        name: "content",
        type: 'long',
        required: true
    }

]

        }
        break;
        case addQuizRecourse:{
            defaultFormData = [
                {
                    label: "Recourse Name",
                    name: "name",
                    type: 'short',
                    required: true
                },
                {
                    label: "Recourse Link",
                    name: "link",
                    type: 'short',
                    required: true
                }
            
            ]

        }
        break;
        case addProblemReport:{
            defaultFormData = [
                {
                    label: "Describe Error",
                    name: "reportText",
                    type: 'long',
                    required: true
                }
            
            ]
        }


    }
    return defaultFormData; 
}