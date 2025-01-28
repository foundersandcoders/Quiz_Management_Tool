import { setDefaultFormData } from "@/utils/setFormatData";
import { useState } from "react";

export default function AddModal({dataFunction, setIsOpen, relevantId}: {}) {
    const defaultFormData =setDefaultFormData(dataFunction) 
    console.log('default form data',defaultFormData)
    const [formData, setFormData] = useState(defaultFormData.reduce((acc, field) => ({
        ...acc,
        [field.name]: field.defaultValue || ''
      }), {}));
    

      // new model pass in a function depending on function contruct specific data object switch case
      // use data object to make the form
      // use function with form data
    function handleSubmit (e) {
        e.preventDefault();
        dataFunction(formData,relevantId)
        setIsOpen(false)
    }
    const handleChange = (fieldName: string, value: string) => {
        setFormData(prev => ({
          ...prev,
          [fieldName]: value
        }));
       
      };

return (
<div>
<form  onSubmit={handleSubmit}>
        

        <div className="space-y-4 py-4">
          {defaultFormData.map((field) => (
            <div key={field.name} className="space-y-2">
              <label htmlFor={field.name}>
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              
              {field.type === 'short' ? (
                <input
                  id={field.name}
                  value={formData[field.name]}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                
                />
              ) : (
                <textarea
                  id={field.name}
                  value={formData[field.name]}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  
                  rows={4}
                />
              )}
              
              
            </div>
          ))}

          
        </div>

       

<button type='submit'>submit</button>
</form>
</div>

)

}
