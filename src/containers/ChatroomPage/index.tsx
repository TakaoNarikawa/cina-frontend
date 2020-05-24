import React, { useCallback, useState } from "react";
import SpaceSelectButton from "src/components/atoms/SpaceSelectButton";
import { StreamPlayer, useRoomStream } from "src/utils/sky-way/functions";
import Provider from "src/utils/sky-way/provider";
import styled from "styled-components";
import ChatroomTable, { TABLE_COOR, UserInfo } from "src/components/atoms/ChatroomTable";

const ContentContainer = styled.div`
  position: relative;
`;
const SpaceSelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

type Space = {
  name: string;
  enabled: boolean;
};
type SpaceList = {
  [id: string]: Space;
};

type UserPosition = { [p: number]: UserInfo };
type Position = [number, number];
const distance = (x: Position, y: Position) =>
  Math.sqrt(Math.pow(x[0] - y[0], 2) + Math.pow(x[1] - y[1], 2));

const TEST_USER_INFO: UserPosition = {
  2: { username: "Adam", self: true },
  5: { username: "Eve" },
  3: { username: "Bob" },
};

const ChatroomPage: React.FC = () => {
  const streams = useRoomStream("foooooo");
  const [userPosition, setUserPosition] = useState<UserPosition>(TEST_USER_INFO);

  const selfPositionIdx = Object.entries(userPosition).find(([k, v]) => v.self)?.[0];
  const selfPosition = selfPositionIdx ? TABLE_COOR[selfPositionIdx] : null;

  const distances = Object.entries(userPosition)
    .filter(([k, v]) => !v.self)
    .map(([k, v]) => ({
      username: v.username,
      distance: selfPosition ? distance(selfPosition, TABLE_COOR[k]) : null,
    }));

  console.log("distances", distances);
  const selectedStreams = distances.map((d) => ({
    username: d.username,
    distance: d.distance,
    stream: streams.find((s) => s.peerId == d.username),
  }));

  const hanleClickSelect = (n: number) => {
    console.log(n);
  };
  return (
    <>
      <ContentContainer>
        <ChatroomTable userPosition={userPosition} onClick={hanleClickSelect} />
      </ContentContainer>
      {streams.map((stream) => (
        <StreamPlayer stream={stream} />
      ))}
    </>
  );
};

const Container: React.FC = () => {
  const onRecieveCall = useCallback((connection) => {
    console.log("on recieve call");
  }, []);
  return (
    <Provider apiKey="df2444a3-b2f1-4440-800a-5084b44b030e" onRecieveCall={onRecieveCall}>
      <ChatroomPage />
    </Provider>
  );
};

export default Container;
