import { Form } from "antd";
import { FC, useState } from "react";
import { EditableContext } from "./context";

type EditableRowProps = {
  index: number;
};

export const EditableRow: FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={{ form, isSubmitted, setIsSubmitted }}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
