import React from "react";
import styled from "styled-components";
import { flexColumn } from "../mixin";

const Description = (props) => {
  const { dt, dd } = props;

  return (
    <DescBox>
      <DescTitle>{dt}</DescTitle>
      <DescText>{dd}</DescText>
    </DescBox>
  );
};

const DescBox = styled.div`
  ${flexColumn};
  align-items: flex-start;
  width: 50%;
`;

const DescTitle = styled.dt`
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.lightGray};
`;

const DescText = styled.dd`
  font-size: 15px;
  font-weight: 600;
`;
export default Description;
