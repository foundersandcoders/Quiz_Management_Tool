export type FormData = {
  [key: string]: string;
}

export type AddModalProps = {
  dataFunction: (formData: FormData, relevantId: number) => void | Promise<void>;
  setIsOpen: (isOpen: boolean) => void;
  relevantId: number;
} 