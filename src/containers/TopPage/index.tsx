import React, { useCallback } from "react";
import TopMessage from "./TopMessage";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const ImageWrapper = styled.div`
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-align-items: stretch;
  align-items: stretch;

  margin: 40px;
`;

const TopPage: React.FC = () => {
  const history = useHistory();
  const onClickLogin = useCallback(() => {
    history.push("/login");
  }, []);
  const onClickRegister = useCallback(() => {
    history.push("/signup");
  }, []);
  return (
    <>
      <TopMessage onClickRegister={onClickRegister} onClickLogin={onClickLogin} />
      <ImageWrapper>
        <img src="https://github.com/TakaoNarikawa/cina-frontend/blob/master/office%20image.png?raw=true" />
      </ImageWrapper>
    </>
  );
};

export default TopPage;
