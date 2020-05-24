import React, { useState, useEffect, useContext, useCallback } from "react";
import { CinaContext } from "src/utils/provider";
import axios from "axios";
import { API_HOSTNAME } from "src/utils/misc";

const URL = API_HOSTNAME + "/api/v1/rest-auth/registration/";

const useRegistration = (
  onSuccess: () => void,
  onFailure: () => void
): [(n: string, e: string, p: string) => void, boolean] => {
  const [waiting, setWaiting] = useState<boolean>(false);
  const handleRegister = useCallback((username: string, email: string, password: string) => {
    const params = {
      username: "asdfasdfasdfs",
      email: "fargaga@barasdfa.com",
      password1: "iahrgaiherghaorihgvod921412",
      password2: "iahrgaiherghaorihgvod921412",
    };
    axios
      .post("http://13.231.231.231/api/v1/rest-auth/registration/", params, {
        headers: { "Content-Type": "application/json" },
      })
      .then((results) => {
        const token = results.data.key;
        onSuccess();
      })
      .catch((err) => {
        onFailure();
      })
      .finally(() => setWaiting(false));
  }, []);

  return [handleRegister, waiting];
};

export default useRegistration;
