import React, { useState, useEffect } from "react";
import Peer, { MediaConnection } from "skyway-js";
import { setStream } from "./functions";

type SkywayContext = {
  peer: Peer | null;
  localStream: MediaStream | null;
  existingCall: MediaConnection | null;
};
const skywayContext: SkywayContext = {
  peer: null,
  localStream: null,
  existingCall: null,
};

type Context = {
  peerId: string | null;

  audioSourceList: MediaDeviceInfo[] | null;
  videoSourceList: MediaDeviceInfo[] | null;

  audioSourceIdx: number | null;
  videoSourceIdx: number | null;
  setAudioSourceIdx: (i: number | null) => void;
  setVideoSourceIdx: (i: number | null) => void;
};
const defaultContext = {
  peerId: null,
  audioSourceList: null,
  videoSourceList: null,
  audioSourceIdx: null,
  videoSourceIdx: null,
  setAudioSourceIdx: (i: number | null) => {},
  setVideoSourceIdx: (i: number | null) => {},
};
export const Context = React.createContext<Context>(defaultContext);

export const setSkywayContext = ({ peer, localStream, existingCall }: Partial<SkywayContext>) => {
  if (peer) skywayContext.peer = peer;
  if (localStream) skywayContext.localStream = localStream;
  if (existingCall) skywayContext.existingCall = existingCall;
};
export const getSkywayContext = () => skywayContext;

type ProviderProps = {
  apiKey: string;
  onRecieveCall: (call: MediaConnection) => void;
  onError?: (err: Error) => void;
};

const Provider: React.FC<ProviderProps> = ({ apiKey, onRecieveCall, onError, children }) => {
  const [peerId, setPeerId] = useState<string | null>(null);
  const [audioSourceIdx, setAudioSourceIdx] = useState<number | null>(null);
  const [videoSourceIdx, setVideoSourceIdx] = useState<number | null>(null);
  const [audioSourceList, setAudioSourceList] = useState<MediaDeviceInfo[] | null>(null);
  const [videoSourceList, setVideoSourceList] = useState<MediaDeviceInfo[] | null>(null);

  useEffect(() => {
    const peer = new Peer({ key: apiKey });
    setSkywayContext({ peer });
    if (peer) {
      peer.on("open", () => {
        console.log("sky-way peer opened");
        setPeerId(peer.id);
      });
      peer.on("call", (call: MediaConnection) => {
        onRecieveCall(call);
      });
      peer.on("error", (err: Error) => {
        console.error(err);
        if (onError) onError(err);
      });
    }
    navigator.mediaDevices.enumerateDevices().then((deviceInfos) => {
      const audioInfos = deviceInfos.filter((d) => d.kind == "audioinput");
      const videoInfos = deviceInfos.filter((d) => d.kind == "videoinput");
      setAudioSourceList(audioInfos);
      setVideoSourceList(videoInfos);
      const defaultAudioId = audioInfos.length > 0 ? 0 : null;
      const defaultVideoId = videoInfos.length > 0 ? 0 : null;
      setAudioSourceIdx(defaultAudioId);
      setVideoSourceIdx(defaultVideoId);
      setStream(
        defaultAudioId ? audioInfos[defaultAudioId].deviceId : null,
        defaultVideoId ? videoInfos[defaultVideoId].deviceId : null
      );
    });
  }, []);
  return (
    <Context.Provider
      value={{
        peerId,
        audioSourceList,
        videoSourceList,
        audioSourceIdx,
        videoSourceIdx,
        setAudioSourceIdx,
        setVideoSourceIdx,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
