import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

export const NotFound = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={handleBackHome}>
            Back Home
          </Button>
        }
      />
    </div>
  );
};
