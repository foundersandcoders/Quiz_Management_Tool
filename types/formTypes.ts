// type FormKeys = 'content' | 'cohortNumber' | 'startDate'| 'endDate'|'questionText'| 'correctAnswer'| 'wrongAnswer1'|'wrongAnswer2'|'wrongAnswer3'|'name'|'link'|'reportText'; // Define the allowed keys


// export type FormData = {
//   [key in FormKeys]: string;
// }

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

