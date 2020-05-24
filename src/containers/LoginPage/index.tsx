import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Form, Input, Typography } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { BASE, X_LARGE } from "src/utils/space";
import styled from "styled-components";
import useLogin from "src/hooks/useLogin";
import "./style.css";
import { Alert } from "antd";
import useUsersInfo from "src/hooks/useUsersInfo";

const { Title, Text } = Typography;

const Container = styled.div`
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-align-items: stretch;
  align-items: stretch;
`;
const FormCard = styled(Card)`
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-align-items: stretch;
  align-items: stretch;

  width: 600px;
  margin-top: ${X_LARGE};
`;
const CardTitle = styled(Title)`
  text-align: center;
  margin-top: ${X_LARGE};
`;
const DescriptionTextWrapper = styled.div`
  padding: ${BASE};
`;
const DescriptionText = styled(Text)`
  text-align: center;
  font-size: 16px;
`;
const BottomMessage = styled.div`
  padding: ${BASE};
  text-align: center;
  font-size: 16px;
`;
const InputWrapper = styled.div`
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-align-items: stretch;
  align-items: stretch;
`;
const WorkspaceInput = styled(Input)<{ align?: "left" | "center" | "right" }>`
  width: 300px;
  text-align: ${(props) => (props.align ? props.align : "left")};
  font-size: 22px;
  color: black;
`;
const UrlSuffixText = styled(Text)`
  margin: 6px 6px 0px;
  font-size: 24px;
  color: black;
`;
const SubmitButton = styled(Button)`
  margin-top: ${BASE};
`;

const AlertWrapper = styled.div`
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-align-items: stretch;
  align-items: stretch;

  padding-top: ${BASE};
`;
const StyledAlert = styled(Alert)`
  width: 60%;
`;

type BaseProps = {
  title: string;
  description: string;
};

const Base: React.FC<BaseProps> = ({ children, title, description }) => (
  <Container>
    <FormCard>
      <CardTitle level={2}>{title}</CardTitle>
      <DescriptionTextWrapper>
        <DescriptionText>{description}</DescriptionText>
      </DescriptionTextWrapper>
      {children}
    </FormCard>
  </Container>
);

export const LoginPage: React.FC = () => {
  const history = useHistory();
  const [showAlert, setShowAlert] = useState(false);
  const [handleLogin] = useLogin(
    () => {
      console.log("success");
      history.push("/chatroom");
    },
    () => {
      console.log("failure");
      setShowAlert(true);
    }
  );
  const onFinish = useCallback((values: any) => {
    const { username, password } = values;
    handleLogin(username, password);
  }, []);
  return (
    <>
      <Base
        title="ワ⁠ー⁠ク⁠ス⁠ペ⁠ー⁠ス⁠に​ログインす⁠る"
        description="メールアドレスとパスワードを入力してください"
      >
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <InputWrapper>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "メールアドレスを入力してください" },
                {
                  type: "email",
                  message: "入力された値はメールアドレスではありません。",
                },
              ]}
            >
              <WorkspaceInput
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="cina@example.com"
                size="large"
              />
            </Form.Item>
          </InputWrapper>
          <InputWrapper>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "パスワードを入力してください" }]}
            >
              <WorkspaceInput
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="パスワード"
                size="large"
                type="password"
              />
            </Form.Item>
          </InputWrapper>

          <InputWrapper>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>ログイン状態を維持する</Checkbox>
              </Form.Item>

              <Link to="/reset_password">パスワードを忘れた</Link>
            </Form.Item>
          </InputWrapper>

          <SubmitButton type="primary" htmlType="submit" block>
            ログイン
          </SubmitButton>
        </Form>
      </Base>
      <BottomMessage>
        <Title level={4}>まだアカウントを持っていませんか？</Title>
        <Text>
          新しくユーザー登録しましょう。<Link to="/signup">新規登録</Link>
        </Text>
      </BottomMessage>

      {showAlert && (
        <AlertWrapper>
          <StyledAlert
            message="ユーザー名とパスワードの組み合わせが正しくありません。"
            type="error"
            onClose={() => setShowAlert(false)}
            closable
          />
        </AlertWrapper>
      )}
    </>
  );
};

export const LoginWorkspacePage: React.FC = () => {
  const history = useHistory();
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  const onFinish = useCallback((values: any) => {
    // サーバーにアクセスして、存在しているかをチェックするべき
    setWorkspaceId(values.url);
  }, []);

  useEffect(() => {
    if (workspaceId) history.push(`/login/${workspaceId}`);
  }, [workspaceId]);

  return (
    <Base
      title="ワ⁠ー⁠ク⁠ス⁠ペ⁠ー⁠ス⁠に​ログインす⁠る"
      description="参加する企業のワークスペースURLを入力してください"
    >
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <InputWrapper>
          <Form.Item
            name="url"
            rules={[{ required: true, message: "ワークスペースURLを入力してください" }]}
          >
            <WorkspaceInput align="right" placeholder="ワークスペースURL" size="large" />
          </Form.Item>
          <UrlSuffixText>.cina.com</UrlSuffixText>
        </InputWrapper>

        <SubmitButton type="primary" htmlType="submit" size="large" block>
          続行する →
        </SubmitButton>
      </Form>
    </Base>
  );
};

export const ResetPasswordPage: React.FC = () => {
  const onFinish = useCallback((values: any) => {
    console.log("Received values of form: ", values);
  }, []);
  return (
    <Base title="パスワードを忘れた" description="登録に用いたメールアドレスを入力">
      <Form onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "メールアドレスを入力して下さい。",
            },
            {
              type: "email",
              message: "入力された値はメールアドレスではありません。",
            },
          ]}
        >
          <Input style={{ width: "100%" }} placeholder="メールアドレス" size="large" />
        </Form.Item>

        <SubmitButton type="primary" htmlType="submit" size="large" block>
          再設定URLを送信
        </SubmitButton>
      </Form>
    </Base>
  );
};
