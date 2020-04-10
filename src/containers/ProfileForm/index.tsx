import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input, Radio, Select, Upload } from "antd";
import React, { useState, useCallback } from "react";
import { beforeUpload, getBase64 } from "src/utils/processImage";

const { Option } = Select;

const SingleFormItem = ({
  id,
  displayName,
  type = "string",
  message = `${displayName}は必須です。`,
  required = true,
  rules = [],
}: {
  id: string;
  displayName: string;
  type?: string;
  message?: string;
  required?: boolean;
  rules?: any[];
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

const DoubleFormItem = ({
  name,
  id,
  displayName,
  type = "string",
  message = [`${displayName[0]}は必須です。`, `${displayName[1]}は必須です。`],
  required = false,
  rules = [],
}: {
  name: string;
  id: [string, string];
  displayName: [string, string];
  type?: string;
  message?: [string, string];
  required?: boolean;
  rules?: any[];
}) => (
  <Form.Item
    label={
      <>
        <span style={{ color: "red" }}>*</span>&nbsp; {name}
      </>
    }
    style={{ marginBottom: 0 }}
  >
    <Form.Item
      name={id[0]}
      rules={[
        ...rules,
        {
          type,
          required,
          message: message[0],
        },
      ]}
      style={{ display: "inline-block", width: "calc(50% - 5px)", marginRight: 8 }}
    >
      <Input placeholder={displayName[0]} />
    </Form.Item>
    <Form.Item
      name={id[1]}
      rules={[
        ...rules,
        {
          type,
          required,
          message: message[1],
        },
      ]}
      style={{ display: "inline-block", width: "calc(50% - 5px)" }}
    >
      <Input placeholder={displayName[1]} />
    </Form.Item>
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

const ProfileImageForm: React.FC = () => {
  const [uploadingProfile, setUploadingProfile] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const handleUploadProfile = useCallback((info: any) => {
    if (info.file.status === "uploading") {
      setUploadingProfile(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        setUploadingProfile(false);
        setProfileImageUrl(imageUrl);
      });
    }
  }, []);
  return (
    <Form.Item label="プロフィール画像">
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload(alert)}
        onChange={handleUploadProfile}
      >
        {profileImageUrl ? (
          <img src={profileImageUrl} alt="avatar" style={{ width: "100%" }} />
        ) : (
          <div>
            {uploadingProfile ? <LoadingOutlined /> : <PlusOutlined />}
            <div className="ant-upload-text">Upload</div>
          </div>
        )}
      </Upload>
    </Form.Item>
  );
};

const ProfileForm: React.FC = () => (
  <>
    <NameForm />
    <EmailForm />
  </>
);
export default ProfileForm;
