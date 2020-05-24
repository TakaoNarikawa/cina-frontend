import React, { useState, useEffect, useContext, useCallback } from "react";
import { CinaContext } from "src/utils/provider";
import axios from "axios";
import { API_HOSTNAME } from "src/utils/misc";

const URL = API_HOSTNAME + "/api/v1/user_info/workspacetable/set_user_location/";

console.log(URL, "URL");

type User = {
  uuid: string;
  username: string;
  email: string;
};

const useSetPosition = (
  onSuccess: () => void,
  onFailure: () => void
): ((location: number) => void) => {
  const { email, token } = useContext(CinaContext);
  const [waiting, setWaiting] = useState<boolean>(false);
  const setPosition = useCallback((location: number) => {
    const params = {
      workspace: "space1",
      email,
      user_location: location,
    };
    axios
      .post(URL, params, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((results) => {
        onSuccess();
      })
      .catch((err) => {
        onFailure();
      })
      .finally(() => setWaiting(false));
  }, []);

  return setPosition;
};

export default useSetPosition;
