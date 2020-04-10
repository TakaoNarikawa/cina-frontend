import { Button, Form, Input, Typography } from "antd";
import React, { useCallback } from "react";
import ProfileForm from "src/containers/ProfileForm";
import { BASE } from "src/utils/space";
import styled from "styled-components";

const { Title } = Typography;

const SubmitButtonWrapper = styled.div`
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-align-items: stretch;
  align-items: stretch;

  padding-top: ${BASE};
`;

const ResetPasswordPage: React.FC = () => {
  const onFinish = useCallback((values: any) => {
    console.log("Received values of form: ", values);
  }, []);
  return (
    <>
      <Typography>
        <Title level={2}>パスワードを忘れた</Title>
      </Typography>

      <Form onFinish={onFinish}>
        <Form.Item
          name="email"
          label="登録に用いたメールアドレスを入力"
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
          <Input style={{ width: "100%" }} placeholder="メールアドレス" />
        </Form.Item>

        <SubmitButtonWrapper>
          <Button type="primary" htmlType="submit">
            再設定URLを送信
          </Button>
        </SubmitButtonWrapper>
      </Form>
    </>
  );
};

export default ResetPasswordPage;
