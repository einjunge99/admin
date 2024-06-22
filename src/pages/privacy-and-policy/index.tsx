import { Typography, Layout, Divider } from "antd";
import styles from "./styles.module.scss";

const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;

export const PrivacyPolicy = () => {
  return (
    <Layout className={styles.privacyPolicyContainer}>
      <Content>
        <Typography>
          <Title className={styles.title}>
            Política de Privacidad de Enseñas
          </Title>
          <Paragraph className={styles.paragraph}>
            En Enseñas, valoramos tu privacidad y estamos comprometidos a
            proteger tu información personal. Esta política de privacidad
            explica cómo recopilamos, utilizamos y compartimos tu información.
          </Paragraph>
          <Divider />
          <Title level={2} className={styles.subTitle}>
            Información que Recopilamos
          </Title>
          <Paragraph className={styles.paragraph}>
            Podemos recopilar la siguiente información:
          </Paragraph>
          <Paragraph className={styles.paragraph}>
            <ul className={styles.list}>
              <li>
                Información de contacto, como nombre, correo electrónico y
                número de teléfono.
              </li>
              <li>Información demográfica, como edad y género.</li>
            </ul>
          </Paragraph>
          <Divider />
          <Title level={2} className={styles.subTitle}>
            Cómo Usamos tu Información
          </Title>
          <Paragraph className={styles.paragraph}>
            Utilizamos tu información para:
          </Paragraph>
          <Paragraph className={styles.paragraph}>
            <ul className={styles.list}>
              <li>Proveer y mejorar nuestros servicios.</li>
              <li>Personalizar tu experiencia en la aplicación.</li>
            </ul>
          </Paragraph>
          <Divider />
          <Title level={2} className={styles.subTitle}>
            Compartir tu Información
          </Title>
          <Paragraph className={styles.paragraph}>
            No compartimos tu información personal con terceros, excepto cuando
            sea necesario para proveer nuestros servicios o cuando la ley lo
            requiera.
          </Paragraph>
          <Divider />
          <Title level={2} className={styles.subTitle}>
            Seguridad
          </Title>
          <Paragraph className={styles.paragraph}>
            Implementamos medidas de seguridad para proteger tu información
            contra accesos no autorizados, alteraciones o destrucción.
          </Paragraph>
          <Divider />
          <Title level={2} className={styles.subTitle}>
            Cambios a esta Política
          </Title>
          <Paragraph className={styles.paragraph}>
            Podemos actualizar esta política de privacidad periódicamente. Te
            notificaremos sobre cualquier cambio publicando la nueva política en
            nuestra aplicación.
          </Paragraph>
          <Divider />
          <Title level={2} className={styles.subTitle}>
            Contacto
          </Title>
          <Paragraph className={styles.paragraph}>
            Si tienes alguna pregunta sobre esta política de privacidad, por
            favor contáctanos a{" "}
            <Text className={styles.contact}>
              29821922001010@ingenieria.usac.edu.gt
            </Text>
            .
          </Paragraph>
        </Typography>
      </Content>
    </Layout>
  );
};
