import React, { useCallback } from "react";
import Peer, { MediaConnection } from "skyway-js";
import { setSkywayContext, getSkywayContext } from "./provider";

export const setStream = (
  audioSource: string | null,
  videoSource: string | null,
  onSetStreamCompletion?: () => void,
  onError?: (err: Error) => void
) => {
  const { existingCall } = getSkywayContext();

  const constraints = {
    audio: { deviceId: audioSource ? { exact: audioSource } : undefined },
    video: { deviceId: videoSource ? { exact: videoSource } : undefined },
  };

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      setSkywayContext({ localStream: stream });

      if (existingCall) {
        existingCall.replaceStream(stream);
        return;
      }

      if (onSetStreamCompletion) onSetStreamCompletion();
    })
    .catch((err) => {
      if (onError) onError(err);
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
