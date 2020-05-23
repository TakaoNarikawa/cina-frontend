import React, { useContext, useCallback } from "react";
import { CinaContext } from "src/utils/provider";
import axios from "axios";
import { API_HOSTNAME } from "src/utils/misc";

const URL = API_HOSTNAME + "/api/v1/user_info/workspaces/exist_workspace/?workspace_name=space1";
const TOKEN = "44b3d723e6eb288eb1449915940f3956e969eb30";
const useLogin = () => {
  const { setToken } = useContext(CinaContext);
  const handleLogin = useCallback((email: string, password: string) => {
    axios
      .get(URL, {
        headers: {
          Authorization: `Token ${TOKEN}`,
        },
      })
      .then((results) => {
        console.log(results);
      })
      .catch((err) => {
        console.log("通信に失敗しました。");
        console.log(err);
      });
  }, []);
  return handleLogin;
};
