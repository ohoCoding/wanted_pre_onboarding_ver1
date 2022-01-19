import React from "react";
import styled from "styled-components";

const MainText = (props) => {
  const { children } = props;
  return <Text>{children}</Text>;
};

const Text = styled.p`
  font-size: 16px;
  line-height: 1.75;
`;

export default MainText;
