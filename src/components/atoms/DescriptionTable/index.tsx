import React from "react";
import styled from "styled-components";
type Props = {
  contents: [string, string][];
};

const Table = styled.table`
  min-width: 350px;
`;

const COL_WIDTH = "25%";
const DESSC_WIDTH = "75%";
const ColTd = styled.td`
  width: ${COL_WIDTH};
  word-break: break-all;
`;
const ColTh = styled.th`
  width: ${COL_WIDTH};
  word-break: break-all;
`;
const DescTd = styled.td`
  width: ${DESSC_WIDTH};
  word-break: break-all;
`;
const DescTh = styled.th`
  width: ${DESSC_WIDTH};
  word-break: break-all;
`;

const DescriptionTable = (props: Props) => {
  const { contents } = props;
  return (
    <Table>
      {contents.map(([col, desc], i) =>
        i > 0 ? (
          <tr>
            <ColTd>{col}</ColTd>
            <DescTd>{desc}</DescTd>
          </tr>
        ) : (
          <tr>
            <ColTh>{col}</ColTh>
            <DescTh>{desc}</DescTh>
          </tr>
        ),
      )}
    </Table>
  );
};

export default DescriptionTable;
