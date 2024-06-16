import { Form, Input, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";

type NameProps = {
  name?: string;
  onNameChange: (name: string) => void;
  onIsInvalidChange: (isInvalid: boolean) => void;
};

export const Name = ({
  onIsInvalidChange,
  onNameChange,
  ...props
}: NameProps) => {
  const [form] = useForm<{ name: string }>();

  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => {
        onIsInvalidChange(false);
      })
      .catch(() => onIsInvalidChange(true))
      .finally(() => {
        onNameChange(values.name);
      });
  }, [form, values]);

  return (
    <>
      <Typography.Title level={5}>
        Paso 1: Coloca un nombre al módulo
      </Typography.Title>
      <Form form={form} initialValues={{ name: props.name }}>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "", max: 25 }]}
        >
          <Input
            value={props.name}
            size="large"
            count={{
              show: true,
              max: 25,
            }}
          />
        </Form.Item>
      </Form>
    </>
  );
};
