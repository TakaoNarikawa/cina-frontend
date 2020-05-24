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
  API_HOSTNAME + `/api/v1/user_info/workspacetable/get_user_location?workspace=space1&email=${e}`;

const otherPositionURL = (e: string) =>
  API_HOSTNAME +
  `/api/v1/user_info/workspacetable/get_other_user_location?workspace=space1&email=${e}`;

const useUserInfo = (): [UserInfo[] | null, () => void] => {
  const { token, email } = useContext(CinaContext);
  const [selfInfo, setSelfInfo] = useState<UserInfo | null>(null);
  const [selfLoading, setSelfLoading] = useState<boolean>(true);
  const [otherLoading, setOtherLoading] = useState<boolean>(true);
  const [otherUserInfo, setOtherUserInfo] = useState<UserInfo[]>([]);

  const loadUserInfo = () => {
    axios
      .get(selfPositionURL(email!), {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((results) => {
        setSelfInfo({
          username: email!,
          position: results.data.location,
          self: true,
        });
      })
      .catch((err) => {})
      .finally(() => {
        setSelfLoading(false);
      });
    console.log(selfPositionURL(email!));
    axios
      .get(otherPositionURL(email!), {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((results) => {
        console.log("success");
        console.log(results);
        setOtherUserInfo(
          results.data.map((r: any) => ({
            username: r.email,
            position: r.user_location,
          }))
        );
      })
      .catch((err) => {})
      .finally(() => {
        setOtherLoading(false);
      });
  };

  useEffect(loadUserInfo, []);

  const combined = [...otherUserInfo, selfInfo as UserInfo];
  return [selfLoading || otherLoading ? null : combined, loadUserInfo];
};

export default useUserInfo;
