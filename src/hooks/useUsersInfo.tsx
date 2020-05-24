import React, { useState, useEffect, useContext, useCallback } from "react";
import { CinaContext } from "src/utils/provider";
import axios from "axios";
import { API_HOSTNAME } from "src/utils/misc";

export type UserInfo = {
  username: string;
  self?: boolean;
  position: number;
};

const selfPositionURL = (e: string) =>
  API_HOSTNAME +
  `/api/v1/user_info/workspacetable/get_other_user_location?workspace=space1&email=${e}`;

const otherPositionURL = (e: string) =>
  API_HOSTNAME +
  `/api/v1/user_info/workspacetable/get_other_user_location?workspace=space1&email=${e}`;

const TEST = [
  { username: "Adam", position: 2, self: true },
  { username: "Eve", position: 5 },
  { username: "Bob", position: 3 },
];

const useUserInfo = (): [UserInfo[] | null, () => void] => {
  const { token, email } = useContext(CinaContext);
  const [selfInfo, setSelfInfo] = useState<UserInfo | null>(null);
  const [selfLoading, setSelfLoading] = useState<boolean>(false);
  const [otherLoading, setOtherLoading] = useState<boolean>(false);
  const [otherUserInfo, setOtherUserInfo] = useState<UserInfo[]>([]);

  const loadUserInfo = () => {
    axios
      .get(selfPositionURL(email!), {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((results) => {
        console.log(results);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setSelfLoading(false);
      });
  };

  useEffect(loadUserInfo, []);
  return [TEST, loadUserInfo];
  return [selfLoading && otherLoading ? null : null, loadUserInfo];
};

export default useUserInfo;
