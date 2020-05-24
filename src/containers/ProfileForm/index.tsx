import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input, Radio, Select, Upload } from "antd";
import React, { useState, useCallback } from "react";
import { beforeUpload, getBase64 } from "src/utils/processImage";
import styled from "styled-components";

const { Option } = Select;

const Wrapper = styled.div`
  max-width: 600px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const SingleFormItem: React.FC<{
  id: string;
  displayName: string;
  type?: string;
  message?: string;
  required?: boolean;
  rules?: any[];
}> = ({
  id,
  displayName,
  type = "string",
  message = `${displayName}は必須です。`,
  required = true,
  rules = [],
}) => (
  <Form.Item
    name={id}
    label={displayName}
    rules={[
      ...rules,
      {
        required,
        message,
      },
    ]}
  >
    <Input style={{ width: "100%" }} placeholder={displayName} type={type} />
  </Form.Item>
);

const NameForm: React.FC = () => (
  <>
    <SingleFormItem id="name" displayName="名前" required />
  </>
);

const EmailForm: React.FC = () => (
  <SingleFormItem
    id="email"
    displayName="メールアドレス"
    required
    rules={[
      {
        type: "email",
        message: "入力された値はメールアドレスではありません。",
      },
    ]}
  />
);

const PasswordForm: React.FC = () => (
  <>
    <SingleFormItem
      id="password"
      displayName="パスワード"
      required
      rules={[
        {
          message: "パスワードを入力してください",
        },
      ]}
      type="password"
    />
  </>
);

const ProfileForm: React.FC = () => (
  <Wrapper>
    <NameForm />
    <EmailForm />
    <PasswordForm />
  </Wrapper>
);
export default ProfileForm;
