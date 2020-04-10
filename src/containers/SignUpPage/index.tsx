import { Button, Checkbox, Form, Modal, Typography } from "antd";
import React, { useState, useCallback } from "react";
import ProfileForm from "src/containers/ProfileForm";
import PrivacyPolicy from "src/components/molecules/PrivacyPolicy";
import { Link, useParams } from "react-router-dom";
import { BASE } from "src/utils/space";
import styled from "styled-components";

const { Title, Text } = Typography;

const TitleWrapper = styled(Typography)`
  text-align: center;
`;

const AcceptButtonWrapper = styled.div`
  padding: ${BASE};
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-align-items: stretch;
  align-items: stretch;
`;

const AcceptPrivacyPolicyText = styled(Text)`
  padding: 0px ${BASE};
`;

const SubmitButtonWrapper = styled.div`
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-align-items: stretch;
  align-items: stretch;

  padding-top: ${BASE};
`;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const SignUpPage: React.FC = () => {
  const params = useParams<{ workspaceId: string }>();

  // 直接 workspaceIdで管理すると、自由にアカウントが作れてしまうため要変更
  const { workspaceId } = params;
  console.log("workspaceId", workspaceId);

  const [policyAccept, setPolicyAccept] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);

  const toggleShowPolicy = useCallback(() => setShowPolicy((prev) => !prev), []);
  const onModalOk = useCallback(() => {
    setShowPolicy(false);
    setPolicyAccept(true);
  }, []);
  const onModalCancel = useCallback(() => {
    setShowPolicy(false);
    setPolicyAccept(false);
  }, []);

  const onFinish = useCallback((values: any) => {
    console.log("Received values of form: ", values);
  }, []);

  return (
    <>
      <TitleWrapper>
        <Title level={2}>ワークスペース {workspaceId} のユーザー登録</Title>
      </TitleWrapper>

      <Form onFinish={onFinish} {...formItemLayout}>
        <ProfileForm />

        <Modal
          title="プライバシーポリシー"
          visible={showPolicy}
          onOk={onModalOk}
          onCancel={onModalCancel}
          okText="同意する"
          cancelText="同意しない"
        >
          <PrivacyPolicy />
        </Modal>

        <AcceptButtonWrapper>
          <Checkbox checked={policyAccept} onChange={toggleShowPolicy} />
          <AcceptPrivacyPolicyText>
            <a onClick={toggleShowPolicy}>プライバシーポリシー</a>に同意する
          </AcceptPrivacyPolicyText>
        </AcceptButtonWrapper>

        <SubmitButtonWrapper>
          <Button disabled={!policyAccept} type="primary" htmlType="submit">
            送信
          </Button>
        </SubmitButtonWrapper>
      </Form>
    </>
  );
};

export default SignUpPage;
