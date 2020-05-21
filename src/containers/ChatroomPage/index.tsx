import React, { useCallback, useContext, useEffect, useRef } from "react";
import SpaceSelectButton from "src/components/atoms/SpaceSelectButton";
import styled from "styled-components";
import Provider, { Context } from "src/utils/sky-way/provider";
import { setStream } from "src/utils/sky-way/functions";

const SpaceSelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChatroomPage: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { localStream } = useContext(Context);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.srcObject = localStream;
    }
  }, [localStream?.id]);

  return (
    <SpaceSelectWrapper>
      <SpaceSelectButton name="フロントチーム" joined />
      <SpaceSelectButton name="インフラチーム" />
      <SpaceSelectButton name="営業チーム" />
      <SpaceSelectButton name="休憩室" />
      {/* <audio ref={audioRef} autoPlay /> */} {/* for debug */}
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
