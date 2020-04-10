import { blue } from "@ant-design/colors";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Drawer, Menu, Row, Typography } from "antd";
import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";

type PushCloseButtonProps = {
  history: ReturnType<typeof useHistory>;
  onClose: () => void;
  to: string;
};

type Props = {
  onClose: () => void;
  visible: boolean;
};

const AccountInfo = (
  <>
    <Row>
      <Col span={8}>
        <Avatar size={64} icon={<UserOutlined />} />
      </Col>
      <Col span={16}>
        <Typography style={{ height: "64px", lineHeight: "64px" }}>わんぱたろう</Typography>
      </Col>
    </Row>
  </>
);

const PushCloseButton: React.FC<PushCloseButtonProps> = ({ children, history, onClose, to }) => {
  const handleClose = useCallback(() => {
    history.push(to);
    onClose();
  }, []);
  return (
    <Button type="link" onClick={handleClose} style={{ width: "100%", height: "100%" }}>
      {children}
    </Button>
  );
};

const CustomDrawer = (props: Props) => {
  const history = useHistory();
  return (
    <Drawer
      title={AccountInfo}
      placement="right"
      closable={false}
      onClose={props.onClose}
      visible={props.visible}
    >
      <Menu style={{ borderRight: "0px" }}>
        <Menu.Item>
          <PushCloseButton history={history} onClose={props.onClose} to="/booked-jobpost">
            <Typography>お気に入り</Typography>
          </PushCloseButton>
        </Menu.Item>
        <Menu.Item>
          <PushCloseButton history={history} onClose={props.onClose} to="/applied-jobpost">
            <Typography>応募済み企業</Typography>
          </PushCloseButton>
        </Menu.Item>
        <Menu.Item>
          <PushCloseButton history={history} onClose={props.onClose} to="/edit_profile">
            <Typography>プロフィール編集</Typography>
          </PushCloseButton>
        </Menu.Item>
        <Menu.Item>
          <PushCloseButton history={history} onClose={props.onClose} to="/">
            <Typography>TOPへ戻る</Typography>
          </PushCloseButton>
        </Menu.Item>
        <Menu.Item>
          <PushCloseButton history={history} onClose={props.onClose} to="/">
            <Typography style={{ color: blue[5] }}>ログアウト</Typography>
          </PushCloseButton>
        </Menu.Item>
      </Menu>
    </Drawer>
  );
};

export default CustomDrawer;
