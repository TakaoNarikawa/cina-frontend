import React, { useState, useEffect } from "react";
import Peer, { MediaConnection } from "skyway-js";
import { setStream } from "./functions";

type SkywayGlobalVariable = {
  peer: Peer | null;
  localStream: MediaStream | null;
  existingCall: MediaConnection | null;
};
const skywayGlobalVariable: SkywayGlobalVariable = {
  peer: null,
  localStream: null,
  existingCall: null,
};

type SkywayContext = {
  peerId: string | null;
  audioSourceList: MediaDeviceInfo[] | null;
  audioSourceIdx: number | null;
  setAudioSourceIdx: (i: number | null) => void;
  localStream: MediaStream | null;
};
const defaultContext = {
  peerId: null,
  audioSourceList: null,
  audioSourceIdx: null,
  setAudioSourceIdx: (i: number | null) => {},
  localStream: null,
};
export const SkywayContext = React.createContext<SkywayContext>(defaultContext);

export const setSkywayGlobalVariable = ({
  peer,
  localStream,
  existingCall,
}: Partial<SkywayGlobalVariable>) => {
  if (peer) skywayGlobalVariable.peer = peer;
  if (localStream) skywayGlobalVariable.localStream = localStream;
  if (existingCall) skywayGlobalVariable.existingCall = existingCall;
};
export const getSkywayGlobalVariable = () => skywayGlobalVariable;

type ProviderProps = {
  apiKey: string;
  onRecieveCall: (call: MediaConnection) => void;
  onError?: (err: Error) => void;
};

const SkywayProvider: React.FC<ProviderProps> = ({ apiKey, onRecieveCall, onError, children }) => {
  const [peerId, setPeerId] = useState<string | null>(null);
  const [audioSourceIdx, setAudioSourceIdx] = useState<number | null>(null);
  const [audioSourceList, setAudioSourceList] = useState<MediaDeviceInfo[] | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const peer = new Peer({ key: apiKey });
    setSkywayGlobalVariable({ peer });
    if (peer) {
      peer.on("open", () => {
        console.log("sky-way peer opened");
        setPeerId(peer.id);
      });
      peer.on("call", (connection: MediaConnection) => {
        onRecieveCall(connection);
      });
      peer.on("error", (err: Error) => {
        console.error(err);
        if (onError) onError(err);
      });
    }
    navigator.mediaDevices.enumerateDevices().then((deviceInfos) => {
      const audioInfos = deviceInfos.filter((d) => d.kind === "audioinput");
      setAudioSourceList(audioInfos);
      const defaultAudioId = audioInfos.length > 0 ? 0 : null;
      setAudioSourceIdx(defaultAudioId);
      setStream(defaultAudioId ? audioInfos[defaultAudioId].deviceId : null, null, (stream) =>
        setLocalStream(stream)
      );
    });
  }, []);
  return (
    <SkywayContext.Provider
      value={{
        peerId,
        audioSourceList,
        audioSourceIdx,
        setAudioSourceIdx,
        localStream,
      }}
    >
      {children}
    </SkywayContext.Provider>
  );
};

export default SkywayProvider;
