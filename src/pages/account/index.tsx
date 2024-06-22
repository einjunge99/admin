import { BaseLayout } from "../../components/layout";
import { Card, Descriptions, Divider, Form, Input, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { useAuth } from "../../providers/auth";

import styles from "./styles.module.scss";
import Paragraph from "antd/es/typography/Paragraph";
import { Button } from "../../components/button";

export const Account = () => {
  const { user, deleteAccount } = useAuth();
  const [form] = useForm<{ title: string }>();
  const [isDeleteDisabled, setIsDeleteDisabled] = useState(false);

  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => {
        setIsDeleteDisabled(false);
      })
      .catch(() => setIsDeleteDisabled(true));
  }, [form, values]);

  const validateExactString = (_, value) => {
    if (value === "Eliminar mi cuenta") {
      return Promise.resolve();
    }
    return Promise.reject();
  };

  return (
    <BaseLayout>
      <div className={styles.account}>
        <Card>
          <Descriptions
            title={
              <Typography.Title level={3}>Datos personales</Typography.Title>
            }
            layout="vertical"
          >
            {user?.displayName ? (
              <Descriptions.Item label="Nombre">
                {user?.displayName}
              </Descriptions.Item>
            ) : null}
            <Descriptions.Item label="Correo electrónico">
              {user?.email}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <Card>
          <Typography.Title level={3} style={{ color: "#fc0404" }}>
            Eliminar mi cuenta
          </Typography.Title>
          <Paragraph>
            Esta acción es{" "}
            <Typography.Text strong>irreversible</Typography.Text>. Si estás de
            acuerdo, escribe
            <Typography.Text code style={{ color: "#fc0404" }}>
              Eliminar mi cuenta
            </Typography.Text>{" "}
            en el recuadro para habilitar el botón:
          </Paragraph>
          <Form form={form} layout="inline" onFinish={deleteAccount}>
            <Form.Item
              name="title"
              rules={[
                {
                  required: true,
                  message: "",
                  validator: validateExactString,
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>
            <Form.Item>
              <Button
                label="Confirmar"
                type="primary"
                htmlType="submit"
                disabled={isDeleteDisabled}
              />
            </Form.Item>
          </Form>
        </Card>
      </div>
    </BaseLayout>
  );
};
