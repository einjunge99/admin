import {
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Label } from "../../types";
import { EditableContext } from "./context";
import { Form, Input, InputRef } from "antd";

type EditableCellProps = {
  editable: boolean;
  dataIndex: keyof Label;
  record: Label;
  placeholder: string;
  title?: string;
  handleSave: (record: Label) => void;
};

export const EditableCell: FC<PropsWithChildren<EditableCellProps>> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  placeholder,
  handleSave,
  ...restProps
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const { form, isSubmitted, setIsSubmitted } = useContext(EditableContext)!;

  useEffect(() => {
    if (isSubmitted) {
      setIsEditing(false);
    }
  }, [isSubmitted]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    const isEmpty =
      (Array.isArray(children) && children.every((child) => !child)) ||
      !children;
    setIsEditing(isEmpty);
  }, []);

  const toggleEdit = () => {
    setIsSubmitted(!isSubmitted);
    setIsEditing(!isEditing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = isEditing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `El campo es obligatorio.`,
          },
        ]}
      >
        <Input
          ref={inputRef}
          onPressEnter={save}
          onBlur={save}
          placeholder={placeholder}
        />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};
