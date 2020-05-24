import { blue } from "@ant-design/colors";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Drawer, Menu, Row, Typography } from "antd";
import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import useLogout from "src/hooks/useLogout";

type PushCloseButtonProps = {
  history: ReturnType<typeof useHistory>;
  onClose: () => void;
  to: string;
};

type Props = {
  onClose: () => void;
  visible: boolean;
};

const CustomDrawer: React.FC<Props> = (props) => {
  const history = useHistory();
  const [execLogout] = useLogout(
    () => {
      history.push("/");
      props.onClose();
    },
    () => {}
  );
  const handleBackToTop = useCallback(() => {
    history.push("/");
    props.onClose();
  }, []);
  const handleLogout = useCallback(() => {
    execLogout();
  }, []);
  return (
    <Drawer placement="right" closable={false} onClose={props.onClose} visible={props.visible}>
      <Menu style={{ borderRight: "0px" }}>
        <Menu.Item>
          <Button type="link" onClick={handleBackToTop} style={{ width: "100%", height: "100%" }}>
            TOPへ戻る
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button type="link" onClick={handleLogout} style={{ width: "100%", height: "100%" }}>
            ログアウト
          </Button>
        </Menu.Item>
      </Menu>
    </Drawer>
  );
};

export default CustomDrawer;
