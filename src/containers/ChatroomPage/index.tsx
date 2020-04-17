import React, { useCallback } from "react";
import SpaceSelectButton from "src/components/atoms/SpaceSelectButton";
import styled from "styled-components";

const SpaceSelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChatroomPage: React.FC = () => {
  return (
    <SpaceSelectWrapper>
      <SpaceSelectButton name="フロントチーム" joined />
      <SpaceSelectButton name="インフラチーム" />
      <SpaceSelectButton name="営業チーム" />
      <SpaceSelectButton name="休憩室" />
    </SpaceSelectWrapper>
  );
};

export default ChatroomPage;
