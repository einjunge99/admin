import { Form, GetRef } from "antd";
import { createContext } from "react";

export const EditableContext = createContext<{
  form: FormInstance<any>;
  isSubmitted: boolean;
  setIsSubmitted: (isSubmitted: boolean) => void;
} | null>(null);
