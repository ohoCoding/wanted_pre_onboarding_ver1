import React from "react";
import styled from "styled-components";
import { flex } from "../mixin";

import Tag from "../elements/Tag";

const Tags = (props) => {
  const { tags } = props;

  return (
    <Container>
      {tags.map((item, idx) => (
        <li key={idx}>
          <Tag name={item.tagName || item.name} />
        </li>
      ))}
    </Container>
  );
};

const Container = styled.div`
  ${flex};
  margin-top: 20px;
  white-space: nowrap;
  overflow-x: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  ${({ theme }) => theme.device.tablet} {
    flex-wrap: wrap;
  }
`;

export default Tags;
