import React, { useCallback, useState } from "react";
import SpaceSelectButton from "src/components/atoms/SpaceSelectButton";
import { StreamPlayer, useRoomStream } from "src/utils/sky-way/functions";
import Provider from "src/utils/sky-way/provider";
import styled from "styled-components";

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

const defaultRooms: SpaceList = {
  frontend: {
    name: "フロントチーム",
    enabled: false,
  },
  infra: {
    name: "インフラチーム",
    enabled: false,
  },
  cs: {
    name: "営業チーム",
    enabled: false,
  },
  rest: {
    name: "休憩室",
    enabled: false,
  },
};

const ChatroomPage: React.FC = () => {
  const [rooms, setRooms] = useState<SpaceList>(defaultRooms);
  const streams = useRoomStream("foooooo");

  const hanleClickSelect = (id: string) => {
    const room = rooms[id];
    setRooms({
      ...rooms,
      [id]: {
        ...room,
        enabled: !room.enabled,
      },
    });
  };
  return (
    <>
      <ContentContainer>
        <SpaceSelectWrapper>
          {Object.entries(rooms).map(([id, { name, enabled }]) => (
            <SpaceSelectButton name={name} joined={enabled} onClick={() => hanleClickSelect(id)} />
          ))}
        </SpaceSelectWrapper>
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
