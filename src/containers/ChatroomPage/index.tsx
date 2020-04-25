import React, { useCallback, useContext } from "react";
import SpaceSelectButton from "src/components/atoms/SpaceSelectButton";
import styled from "styled-components";
import Provider, { Context } from "src/utils/sky-way/provider";
import { setStream } from "src/utils/sky-way/functions";

const SpaceSelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChatroomPage: React.FC = () => {
  const foo = useContext(Context);
  console.log(foo);
  return (
    <SpaceSelectWrapper>
      <SpaceSelectButton name="フロントチーム" joined />
      <SpaceSelectButton name="インフラチーム" />
      <SpaceSelectButton name="営業チーム" />
      <SpaceSelectButton name="休憩室" />

      <button
      // onClick={() => {
      //   setStream(
      //     (stream) => {
      //       console.log(stream);
      //     },
      //     () => {},
      //     () => {}
      //   );
      // }}
      >
        setStream
      </button>
    </SpaceSelectWrapper>
  );
};

const Container: React.FC = () => {
  const onRecieveCall = useCallback((call) => {
    console.log("call", call);
  }, []);
  return (
    <Provider apiKey="df2444a3-b2f1-4440-800a-5084b44b030e" onRecieveCall={onRecieveCall}>
      <ChatroomPage />
    </Provider>
  );
};

export default Container;
