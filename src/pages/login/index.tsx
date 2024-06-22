import { Divider, Form, Input, Typography } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";
import { Button } from "../../components/button";
import { useAuth } from "../../providers/auth";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../providers/notification";
import { useEffect } from "react";

export const Login = () => {
  const { user, error, loginWithEmailAndPassword, loginWithGoogle } = useAuth();
  const { notify } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      notify(
        {
          message: "Algo salió mal...",
          description: "Por favor, vuelve a intentar en unos minutos",
        },
        "error"
      );
    }
  }, [error]);

  const onFinish = async (values: { email: string; password: string }) => {
    loginWithEmailAndPassword(values.email, values.password);
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <div className={styles.intro}>
          <div className={styles.image}>
            {/* Replace with your SVG or image */}
            <img src="path_to_your_image" alt="Lovebirds" />
          </div>
          <h2>Maecenas mattis egestas</h2>
          <p>
            Erdum et malesuada fames ac ante ipsum primis in faucibus
            suspendisse porta.
          </p>
        </div>
      </div>
      <div className={styles.rightPanel}>
        <Typography.Title>Bienvenido </Typography.Title>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Por favor, ingresa tu correo" },
            ]}
          >
            <Input placeholder="Correo electrónico" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Por favor, ingresa tu contraseña" },
            ]}
          >
            <Input.Password placeholder="Contraseña" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.signInButton}
              label="Iniciar sesión"
              // TODO: add loading. Store firebase validations on mutation
            />
          </Form.Item>
          <Divider>o</Divider>
          <Form.Item>
            <Button
              className={styles.googleSignIn}
              icon={<GoogleOutlined />}
              label="Iniciar sesión con Google"
              onClick={loginWithGoogle}
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
