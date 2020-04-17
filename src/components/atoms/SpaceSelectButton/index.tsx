import { Skeleton, Button, Typography, Radio } from "antd";
import React from "react";
import assignDeep from "object-assign-deep";
import styled from "styled-components";
import { BASE } from "src/utils/space";
import { DownloadOutlined } from "@ant-design/icons";

const { Text } = Typography;

const StyledButton = styled(Button)`
  width: 200px;
  margin: 10px 0px;
`;

type Props = {
  name: string;
  joined?: boolean;
};

const SpaceSelectButton = ({ name, joined }: Props) => {
  return (
    <StyledButton type={joined ? "primary" : "default"} shape="round" size="large">
      <span>{name}</span>
    </StyledButton>
  );
};

export default SpaceSelectButton;
