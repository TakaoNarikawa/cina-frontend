import React, { useState, useCallback, useRef, useEffect } from "react";
import Peer, { MediaConnection, RoomStream } from "skyway-js";
import { setSkywayContext, getSkywayContext } from "./provider";

export const setStream = (
  audioSource: string | null,
  videoSource: string | null,
  onSetStreamCompletion?: (stream: MediaStream) => void,
  onError?: (err: Error) => void
) => {
  const { existingCall } = getSkywayContext();

  const constraints = {
    audio: { deviceId: audioSource ? { exact: audioSource } : undefined },
    // video: { deviceId: videoSource ? { exact: videoSource } : undefined },
  };

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      setSkywayContext({ localStream: stream });

      if (existingCall) {
        existingCall.replaceStream(stream);
        return;
      }

      if (onSetStreamCompletion) onSetStreamCompletion(stream);
    })
    .catch((err) => {
      if (onError) onError(err);
      console.error(err);
    });
};
const takeCall = (
  call: MediaConnection,
  existingCall: MediaConnection | null,
  onStream: (stream: MediaStream) => void,
  onClose: () => void
) => {
  if (existingCall) existingCall.close();

  call.on("stream", onStream);
  call.on("close", onClose);
};

export const makeCall = (
  id: string,
  onStream: (stream: MediaStream) => void,
  onClose: () => void
) => {
  const { peer, localStream, existingCall } = getSkywayContext();
  if (!peer || !localStream) return;
  const call = peer.call(id, localStream);
  takeCall(call, existingCall, onStream, onClose);
};

export const endCall = (onSetStreamCompletion: () => void) => {
  const { existingCall } = getSkywayContext();
  existingCall?.close();
  onSetStreamCompletion();
};

export const joinRoom = (roomId: string) => {
  console.log("joinRoom");
  const { peer, localStream } = getSkywayContext();

  if (!localStream) {
    return;
  }

  const room = peer?.joinRoom(roomId, {
    mode: "mesh",
    stream: localStream,
  });

  room?.once("open", () => {
    console.log("room open");
  });

  room?.once("peerJoin", (peerId) => {
    console.log("peer join");
  });
  room?.on("stream", (stream) => {
    console.log("room stream");
  });
};

type Peers = {
  stream: RoomStream;
};
export const useRoomStream = (roomId: string) => {
  const { peer, localStream } = getSkywayContext();
  const [streams, setStreams] = useState<RoomStream[]>([]);

  useEffect(() => {
    console.log();
    if (!(localStream && peer?.open)) {
      return;
    }

    const room = peer?.joinRoom(roomId, {
      mode: "mesh",
      stream: localStream,
    });

    room?.once("open", () => {
      console.log("room open");
    });

    room?.once("peerJoin", (peerId) => {
      console.log("peer join");
    });
    room?.on("stream", (stream: RoomStream) => {
      console.log("room stream");
      setStreams([...streams, stream]);
    });
  }, [localStream?.id, roomId, peer?.open]);

  return streams;
};

export const StreamPlayer: React.FC<{ stream: RoomStream }> = ({ stream }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.srcObject = stream;
    }
  }, [stream.id]);
  return <audio ref={audioRef} autoPlay />;
};
