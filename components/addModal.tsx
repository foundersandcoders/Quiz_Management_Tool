export default function AddModal({targetTable, setIsOpen, addType = ''}: {targetTable: string}) {
    const switchCaseDeterminObject = {targetTable: targetTable, addType: addType}
   
    type FieldConfig = {
        name: string;
        label: string;
        type: 'short' | 'long';
        defaultValue?: string | number;
        required?: boolean;
        validation?: (value: any) => boolean | string;
      }

    function setDefaultFormData(switchCaseDeterminObject){
       let defaultFormData:FieldConfig[] = []
        switch(switchCaseDeterminObject){
            case {targetTable: 'questions', addType:'add new question'}:{
                defaultFormData  = [
                    {
                        name: "Question Text",
                        label: "Question Text",
                        type: 'long', 
                        required: true
                      },
                      {
                        name: "Correct Answer",
                        label: "Correct Answer",
                        type: 'short', 
                        required: true
                      },
                      {
                        name: "Wrong Answer",
                        label: "Wrong Answer",
                        type: 'short', 
                        required: true
                      },
                      {
                        name: "Wrong Answer",
                        label: "Wrong Answer",
                        type: 'short', 
                        required: true
                      },
                      {
                        name: "Wrong Answer",
                        label: "Wrong Answer",
                        type: 'short', 
                        required: true
                      }
    
]

}

}

   
    break; 


   }
   





   
    function handleSubmit (e) {
        e.preventDefault();
        switch(switchCaseDeterminObject){
            case {targetTable: 'questions', addType:'add new question'}:


   
    break;
        }
    }

return (
<div>
<form  onSubmit={handleSubmit}>


<button type='submit'>submit</button>
</form>

</div>

)

}
