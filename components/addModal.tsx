import { setDefaultFormData } from "@/utils/setFormatData";
import { useState } from "react";
import { FormData, AddModalProps } from "@/types/formTypes";

export default function AddModal({ dataFunction, setIsOpen, relevantId }: AddModalProps) {
    const defaultFormData = setDefaultFormData(dataFunction) 
    const [formData, setFormData] = useState<FormData>(defaultFormData.reduce((acc, field) => ({
        ...acc,
        [field.name]: field.defaultValue || ''
      }), {}));
    

      
    function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
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
<div className="fixed left-0 top-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none flex justify-center items-center bg-black bg-opacity-50">
  <div className="bg-background max-w-md w-full max-h-[80vh] overflow-y-auto p-6 rounded-lg shadow-lg">
    <form  onSubmit={handleSubmit}>
        

        <div className="space-y-4 py-4">
          {defaultFormData.map((field) => (
            <div key={field.name} className="space-y-2">
              <label htmlFor={field.name}>
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              
              {field.type === 'short' || field.type === 'date' ? (
                <input
                  id={field.name}
                  type={field.type === 'date' ? 'date' : 'text'}
                  value={formData[field.name]}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="border rounded-lg p-4"

                />
              ) : (
                <textarea
                  id={field.name}
                  value={formData[field.name]}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="border rounded-lg p-4"

                  rows={4}
                />
              )}
              
              
            </div>
          ))}

          
        </div>

       
<div className="flex gap-1">
<button type='submit' className="button">Submit</button>
<button type='button' className='button' onClick={() => setIsOpen(false)}>Cancel</button>
</div>
</form>

  </div>
</div>

)

}
