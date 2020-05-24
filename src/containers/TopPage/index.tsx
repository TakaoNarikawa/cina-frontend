import React, { useCallback } from "react";
import TopMessage from "./TopMessage";
import { useHistory } from "react-router-dom";

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
    </>
  );
};

export default TopPage;
