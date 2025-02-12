// type FormKeys = 'content' | 'cohortNumber' | 'startDate'| 'endDate'|'questionText'| 'correctAnswer'| 'wrongAnswer1'|'wrongAnswer2'|'wrongAnswer3'|'name'|'link'|'reportText'; // Define the allowed keys


// export type FormData = {
//   [key in FormKeys]: string;
// }

export type FormData = {

  content?: string; // Added content
  cohortNumber?: string; // Added cohortNumber
  startDate?: string; // Added startDate
  endDate?: string; // Added endDate
  questionText?: string; // Added questionText
  correctAnswer?: string; // Added correctAnswer
  wrongAnswer1?: string; // Added wrongAnswer1
  wrongAnswer2?: string; // Added wrongAnswer2
  wrongAnswer3?: string; // Added wrongAnswer3
  reportText?: string; // Added reportText};
}
export type AddModalProps = {
  dataFunction: (formData: FormData, relevantId: number) => void | Promise<void>;
  setIsOpen: (isOpen: boolean) => void;
  relevantId: number;
} 

