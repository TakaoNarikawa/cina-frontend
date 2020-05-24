import React, { useState, useEffect, useContext, useCallback } from "react";
import { CinaContext } from "src/utils/provider";
import axios from "axios";
import { API_HOSTNAME } from "src/utils/misc";

const URL = API_HOSTNAME + "/api/v1/user_info/users/";

type User = {
  uuid: string;
  username: string;
  email: string;
};

const useUsersInfo = () => {
  const { token } = useContext(CinaContext);
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(URL, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((results) => {
        console.log(results);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);
  return [users];
};

export default useUsersInfo;
