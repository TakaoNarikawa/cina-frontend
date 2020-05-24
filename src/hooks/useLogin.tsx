import React, { useState, useEffect, useContext, useCallback } from "react";
import { CinaContext } from "src/utils/provider";
import axios from "axios";
import { API_HOSTNAME } from "src/utils/misc";

const URL = API_HOSTNAME + "/api/v1/rest-auth/login/";

console.log(URL, "URL");

type User = {
  uuid: string;
  username: string;
  email: string;
};

const useLogin = (
  onSuccess: () => void,
  onFailure: () => void
): [(n: string, p: string) => void, boolean] => {
  const [waiting, setWaiting] = useState<boolean>(false);
  const { setToken, setEmail } = useContext(CinaContext);
  const handleLogin = useCallback((username: string, password: string) => {
    const params = {
      username,
      password,
    };
    axios
      .post(URL, params, {
        headers: { "Content-Type": "application/json" },
      })
      .then((results) => {
        const token = results.data.key;
        setToken(token);
        setEmail(username);
        onSuccess();
      })
      .catch((err) => {
        onFailure();
      })
      .finally(() => setWaiting(false));
  }, []);

  return [handleLogin, waiting];
};

export default useLogin;
