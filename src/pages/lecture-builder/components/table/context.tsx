import { FormInstance } from "antd";
import { createContext } from "react";

export const EditableContext = createContext<{
  form: FormInstance;
  isSubmitted: boolean;
  setIsSubmitted: (isSubmitted: boolean) => void;
} | null>(null);
