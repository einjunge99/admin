import { Form, Input, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";

type LectureProps = {
  title?: string;
  onTitleChange: (title: string) => void;
  onIsInvalidChange: (isInvalid: boolean) => void;
};

export const Lecture = ({
  onIsInvalidChange,
  onTitleChange,
  ...props
}: LectureProps) => {
  const [form] = useForm<{ title: string }>();

  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => {
        onIsInvalidChange(false);
      })
      .catch(() => onIsInvalidChange(true))
      .finally(() => {
        onTitleChange(values?.title);
      });
  }, [form, values]);

  return (
    <>
      <Typography.Title level={5}>
        Paso 1: Coloca un nombre a la lección
      </Typography.Title>
      <Form form={form} initialValues={{ title: props.title }}>
        <Form.Item
          name="title"
          rules={[{ required: true, message: "", max: 25 }]}
        >
          <Input
            value={props.title}
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
