import React from "react";
import styled from "styled-components";

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

export type UserInfo = {
  username: string;
  self?: boolean;
};
type Props = {
  userPosition: {
    [pos: number]: UserInfo;
  };
  onClick: (i: number) => void;
};

type TableElementProps = { exists?: boolean; self?: boolean };

const Table = styled.table`
  min-width: 350px;
`;
const COMMON_STYLE = `
  text-align: center;
  widTh: 100px;
  height: 100px;
`;
const EXIST_STYLE = `
  background-color: red;
`;
const SELF_STYLE = `
  background-color: blue;
`;
const Th = styled.th<TableElementProps>`
  ${(props) => (props.exists ? EXIST_STYLE : "")}
  ${(props) => (props.self ? SELF_STYLE : "")}
  ${COMMON_STYLE}
`;
const Td = styled.td<TableElementProps>`
  ${(props) => (props.exists ? EXIST_STYLE : "")}
  ${(props) => (props.self ? SELF_STYLE : "")}
  ${COMMON_STYLE}
`;

const ChatroomTable: React.FC<Props> = ({ userPosition, onClick }) => (
  <>
    <Table>
      {TABLE_LAYOUT.map((row, i) => {
        const Ele = i > 0 ? Td : Th;
        return (
          <tr>
            {row.map((e, j) => {
              const user = e != null ? userPosition[e] : null;
              return (
                <Ele
                  exists={e != null}
                  self={user?.self}
                  onClick={() => {
                    if (e) onClick(e);
                  }}
                >
                  {user?.username}
                </Ele>
              );
            })}
          </tr>
        );
      })}
    </Table>
  </>
);
export default ChatroomTable;
