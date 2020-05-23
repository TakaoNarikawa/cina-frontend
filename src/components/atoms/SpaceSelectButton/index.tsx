import { Button, Typography } from "antd";
import React from "react";
import styled from "styled-components";

const { Text } = Typography;

const StyledButton = styled(Button)`
  width: 200px;
  margin: 10px 0px;
`;

type Props = {
  name: string;
  joined: boolean;
  onClick: () => void;
};

const SpaceSelectButton: React.FC<Props> = ({ name, joined, onClick }) => (
  <StyledButton type={joined ? "primary" : "default"} shape="round" size="large" onClick={onClick}>
    <span>{name}</span>
  </StyledButton>
);

export default SpaceSelectButton;
