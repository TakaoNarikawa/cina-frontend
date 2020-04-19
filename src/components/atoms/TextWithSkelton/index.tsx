import { Skeleton } from "antd";
import React from "react";
import assignDeep from "object-assign-deep";
import styled from "styled-components";
import { BASE } from "src/utils/space";
import "./style.css";

const StyledSkeleton = styled(Skeleton)`
  padding-top: ${BASE};
`;

type Props = {
  loading: boolean;
  content: string | React.ReactNode;
  skeletonProps?: any;
};

const WithSkeleton: React.FC<Props> = (props) => {
  const defaultProps = {
    skeletonProps: {
      paragraph: { rows: 1 },
      title: false,
      active: true,
    },
  };
  // assignDeep(defaultProps, props);
  const filledProps = {
    ...props,
    skeletonProps: assignDeep(defaultProps.skeletonProps, props.skeletonProps),
  };

  const { content } = props;
  return <>{filledProps.loading ? <StyledSkeleton {...filledProps.skeletonProps} /> : content}</>;
};

export default WithSkeleton;
