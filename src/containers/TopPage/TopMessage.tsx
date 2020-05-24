import { Button, Typography } from "antd";
import React from "react";
import { BASE, PAGE_SIDE_PADDING, X_LARGE } from "src/utils/space";
import styled from "styled-components";

const { Title } = Typography;
const TOP_MESSAGE_BACKGROUND_COLOR = "#f0f2f5";

const MessageWrapper = styled(Typography)`
  margin: 0px -${PAGE_SIDE_PADDING} 0px;
  background-color: ${TOP_MESSAGE_BACKGROUND_COLOR};
  z-index: 0;
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%);
`;
const Overlay = styled.div`
  padding: ${X_LARGE} 0px;
  z-index: 10;
  position: relative;
`;
const MessageText = styled(Title)`
  text-align: center;
  margin-top: ${BASE}!important;
`;
const ButtonWrapper = styled.div`
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-align-items: stretch;
  align-items: stretch;

  padding-top: ${BASE};
`;

const StyledButton = styled(Button)`
  margin: ${BASE};
`;

type Props = {
  onClickRegister: () => void;
  onClickLogin: () => void;
};

const TopMessage: React.FC<Props> = ({ onClickRegister, onClickLogin }) => {
  return (
    <>
      <MessageWrapper>
        {/* <VideoPlayer url="http://thenewcode.com/assets/videos/polina.mp4" playing={true} /> */}
        <Overlay>
          <MessageText level={2}>ボタンを押した瞬間</MessageText>
          <MessageText level={2}>あなたの部屋がオフィスに</MessageText>

          <ButtonWrapper>
            <StyledButton type="primary" shape="round" size="large" onClick={onClickRegister}>
              ユーザー新規登録
            </StyledButton>
            <StyledButton type="primary" shape="round" size="large" onClick={onClickLogin}>
              ログイン
            </StyledButton>
          </ButtonWrapper>
        </Overlay>
      </MessageWrapper>
    </>
  );
};

export default TopMessage;
