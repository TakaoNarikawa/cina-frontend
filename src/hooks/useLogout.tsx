import React, { useState, useEffect, useContext, useCallback } from "react";
import { CinaContext } from "src/utils/provider";
import axios from "axios";
import { API_HOSTNAME } from "src/utils/misc";

const URL = API_HOSTNAME + "/api/v1/rest-auth/logout/";

const useLogout = (onSuccess: () => void, onFailure: () => void): [() => void, boolean] => {
  const [waiting, setWaiting] = useState<boolean>(false);
  const { token, setToken } = useContext(CinaContext);
  const handleLogout = useCallback(() => {
    axios
      .post(URL, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((results) => {
        console.log(results);
        setToken(null);
        onSuccess();
      })
      .catch((err) => {
        onFailure();
      })
      .finally(() => setWaiting(false));
  }, []);

  return [handleLogout, waiting];
};

export default useLogout;
