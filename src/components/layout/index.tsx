import { Card, Layout, Menu, MenuProps, Typography, theme } from "antd";
import styles from "./styles.module.scss";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import { MenuItemGroupProps } from "antd/es/menu";
import { SettingOutlined, LogoutOutlined } from "@ant-design/icons";
import { useAuth } from "../../providers/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { FC, ReactNode, useMemo } from "react";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItemGroupProps[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Mi cuenta", "account", <SettingOutlined />),
  getItem("Cerrar sesión", "logout", <LogoutOutlined />),
];

type LayoutProps = {
  children: ReactNode;
};

export const BaseLayout: FC<LayoutProps> = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const headerTitle = useMemo(() => {
    switch (location.pathname) {
      case "/":
        return "Lecciones";
      case "/account":
        return "Mi cuenta";
    }
  }, [location.pathname]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (key: string) => {
    switch (key) {
      case "logout":
        logout().then(() => {
          navigate("/login", { replace: true });
        });
        break;
      case "account":
        navigate("/account");
        break;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <div className={styles.sider}>
          <Card onClick={() => navigate("/")}>Enseñas</Card>
          <Menu
            theme="dark"
            selectedKeys={["logout"]}
            onClick={(e) => {
              handleMenuClick(e.key);
            }}
            mode="inline"
            items={items}
          />
        </div>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            paddingLeft: 16,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography.Title>{headerTitle}</Typography.Title>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
