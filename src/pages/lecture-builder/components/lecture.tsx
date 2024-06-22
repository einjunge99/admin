import { Form, Input, Typography, Upload, UploadProps } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { RcFile } from "antd/es/upload";

type LectureProps = {
  iconFile: RcFile | null;
  title?: string;
  onIconFileChange: (iconFile: RcFile | null) => void;
  onTitleChange: (title: string) => void;
  onIsInvalidChange: (isInvalid: boolean) => void;
};

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
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

  const iconUploadProps: UploadProps = {
    accept: ".png",
    listType: "picture-card",
    onRemove: () => {
      props.onIconFileChange(null);
    },
    beforeUpload: (file) => {
      props.onIconFileChange(file);
      return false;
    },
  };

  return (
    <>
      <Typography.Title level={5}>
        Paso 1: Coloca un nombre e ícono a la lección
      </Typography.Title>
      <Form form={form} initialValues={{ title: props.title }}>
        <Form.Item
          name="title"
          label="Título"
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
        <Form.Item
          label="Ícono"
          name="iconFile"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: "" }]}
        >
          <Upload {...iconUploadProps}>
            <button style={{ border: 0, background: "none" }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Agregar ícono</div>
            </button>
          </Upload>
        </Form.Item>
      </Form>
    </>
  );
};
