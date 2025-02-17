

export type FormData = {
  [key: string]: string | undefined; 
  content?: string; 
  cohortNumber?: string; 
  startDate?: string; 
  endDate?: string; 
  questionText?: string; 
  
  correctAnswer?: string; 
  wrongAnswer1?: string; 
  wrongAnswer2?: string; 
  wrongAnswer3?: string; 
  reportText?: string; 
  
}
export type AddModalProps = {
  dataFunction: (formData: FormData, relevantId: number) => void | Promise<void>;
  setIsOpen: (isOpen: boolean) => void;
  relevantId: number;
} 

