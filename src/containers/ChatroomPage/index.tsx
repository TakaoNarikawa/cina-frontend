import React, { useCallback, useState, useContext } from "react";
import SpaceSelectButton from "src/components/atoms/SpaceSelectButton";
import { StreamPlayer, useRoomStream } from "src/utils/sky-way/functions";
import Provider from "src/utils/sky-way/provider";
import styled from "styled-components";
import ChatroomTable, { TABLE_COOR } from "src/components/atoms/ChatroomTable";
import useUsersInfo, { UserInfo } from "src/hooks/useUsersInfo";
import { HUGE } from "src/utils/space";
import { CinaContext } from "src/utils/provider";
import useSetPosition from "src/hooks/useSetPosition";
import { Alert } from "antd";
import { RoomStream } from "skyway-js";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: ${HUGE};
`;
const StyledChatroomTable = styled(ChatroomTable)`
  margin: 0;
`;

type Space = {
  name: string;
  enabled: boolean;
};
type SpaceList = {
  [id: string]: Space;
};

type Position = [number, number];
const distance = (x: Position, y: Position) =>
  Math.sqrt(Math.pow(x[0] - y[0], 2) + Math.pow(x[1] - y[1], 2));

const ChatroomPage: React.FC = () => {
  const streams = useRoomStream("foooooo");
  const [userInfo, reloadUserInfo] = useUsersInfo();
  const [showAlert, setShowAlert] = useState(false);
  const [alertBody, setAlertBody] = useState("");
  const setPosition = useSetPosition(
    () => {
      reloadUserInfo();
    },
    () => {
      setShowAlert(true);
      setAlertBody("席を変更できませんでした。");
      reloadUserInfo();
    }
  );

  const hanleClickSelect = (n: number) => {
    setPosition(n);
  };

  return (
    <>
      <ContentContainer>
        {userInfo ? (
          <>
            <StyledChatroomTable userInfo={userInfo} onClick={hanleClickSelect} />
            <StreamPlayerManager streams={streams} userInfo={userInfo} />
          </>
        ) : (
          <>読み込み中</>
        )}
      </ContentContainer>
      {showAlert && (
        <Alert
          message="エラー"
          description={alertBody}
          type="error"
          closable
          onClose={() => setShowAlert(false)}
        />
      )}
    </>
  );
};

const StreamPlayerManager: React.FC<{ streams: RoomStream[]; userInfo: UserInfo[] }> = ({
  streams,
  userInfo,
}) => {
  const selfPositionIdx = Object.entries(userInfo).find(([k, v]) => v.self)?.[0];
  const selfPosition = selfPositionIdx ? TABLE_COOR[selfPositionIdx] : null;
  const distances = Object.entries(userInfo)
    .filter(([k, v]) => !v.self)
    .map(([k, v]) => ({
      username: v.username,
      distance: selfPosition ? distance(selfPosition, TABLE_COOR[k]) : null,
    }));

  const selectedStreams = distances.map((d) => ({
    username: d.username,
    distance: d.distance,
    stream: streams.find((s) => s.peerId == d.username)!,
  }));

  return (
    <>
      {streams.map((s) => (
        <StreamPlayer stream={s} />
      ))}
    </>
  );
};

const Container: React.FC = () => {
  const { email, token } = useContext(CinaContext);
  const onRecieveCall = useCallback((connection) => {
    console.log("on recieve call");
  }, []);
  return (
    <Provider apiKey="df2444a3-b2f1-4440-800a-5084b44b030e" onRecieveCall={onRecieveCall}>
      {email && token ? <ChatroomPage /> : <>メールアドレスとTokenが設定されていない</>}
    </Provider>
  );
};

export default Container;
