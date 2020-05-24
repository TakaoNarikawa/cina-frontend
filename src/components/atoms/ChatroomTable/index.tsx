import React from "react";
import styled from "styled-components";
import { UserInfo } from "src/hooks/useUsersInfo";
import { Avatar } from "antd";

const TABLE_LAYOUT: (number | null)[][] = [
  [0, 1, 2, null, 3, 4],
  [5, 6, 7, null, 8, 9],
  [null, null, null, null, 10, 11],
  [12, 13, 14, null, 15, 16],
  [17, 18, 19, null, 20, 21],
  [null, null, null, null, 22, 23],
];
export const TABLE_COOR: { [p: string]: [number, number] } = {
  0: [0, 0],
  1: [1, 0],
  2: [2, 0],
  3: [4, 0],
  4: [5, 0],
  5: [0, 1],
  6: [1, 1],
  7: [2, 1],
  8: [4, 1],
  9: [5, 1],
  10: [4, 2],
  11: [5, 2],
  12: [0, 3],
  13: [1, 3],
  14: [2, 3],
  15: [4, 3],
  16: [5, 3],
  17: [0, 4],
  18: [1, 4],
  19: [2, 4],
  20: [4, 4],
  21: [5, 4],
  22: [4, 5],
  23: [5, 5],
};
const imgObj: { [name: string]: string } = {};

const getImgUrl = (name: string): string => {
  const img = imgObj[name];
  if (img) return img;
  const imgId = Math.floor(Math.random() * 75) + 1;
  const newImg = `https://randomuser.me/api/portraits/med/men/${imgId}.jpg`;
  imgObj[name] = newImg;
  return newImg;
};

type Props = {
  userInfo: UserInfo[];
  onClick: (i: number) => void;
};

type TableElementProps = { available?: boolean; self?: boolean };

const StyledAvatar = styled(Avatar)`
  border: 1px solid #808080;
`;
const Table = styled.table`
  min-width: 350px;
`;
const COMMON_STYLE = `
  text-align: center;
  widTh: 100px;
  height: 100px;
`;
const AVAILABLE_STYLE = `
  border: 1px solid rgba(100,100,100,0.1);
  background-color: rgba(255,255,255,0.6);
`;
const SELF_STYLE = `
  background-color: #e9f7fe;
  border-top: 3px solid #1890ff;
`;
const Th = styled.th<TableElementProps>`
  ${(props) => (props.available ? AVAILABLE_STYLE : "")}
  ${(props) => (props.self ? SELF_STYLE : "")}
  ${COMMON_STYLE}
`;
const Td = styled.td<TableElementProps>`
  ${(props) => (props.available ? AVAILABLE_STYLE : "")}
  ${(props) => (props.self ? SELF_STYLE : "")}
  ${COMMON_STYLE}
`;

const ChatroomTable: React.FC<Props> = ({ userInfo, onClick }) => {
  const userInfoObj = Object.fromEntries(userInfo.map((p) => [p.position, p]));
  return (
    <>
      <Table>
        {TABLE_LAYOUT.map((row, i) => {
          const Ele = i > 0 ? Td : Th;
          return (
            <tr>
              {row.map((e, j) => {
                const user = e != null ? userInfoObj[e] : null;
                return (
                  <Ele
                    available={e != null}
                    self={user?.self}
                    onClick={() => {
                      if (e) onClick(e);
                    }}
                  >
                    {user && (
                      <StyledAvatar size={72} icon={<img src={getImgUrl(user.username)} />} />
                    )}
                  </Ele>
                );
              })}
            </tr>
          );
        })}
      </Table>
    </>
  );
};
export default ChatroomTable;
