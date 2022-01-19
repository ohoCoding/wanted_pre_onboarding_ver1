import React from "react";
import styled, { css } from "styled-components";

const Tag = ({ name, selected, _onClick }) => {
  if (selected) {
    let convertName = isNaN(Number(name[name.length - 1])) ? name : name + "%";

    if (name === "퇴사율205%25이하") {
      convertName = "퇴사율5%이하";
    }
    return (
      <BorderBtn onClick={_onClick}>
        <BorderText>{convertName}</BorderText>
      </BorderBtn>
    );
  }

  return (
    <TagBtn>
      <TagName>{name}</TagName>
    </TagBtn>
  );
};

Tag.defaultProps = {
  text: "",
  selected: false,
};

const Btn = css`
  flex-shrink: 0;
  padding: 9px 14px;
  margin-bottom: 10px;
  margin-right: 6px;
  border-radius: 25px;
  white-space: nowrap;
`;

const TagBtn = styled.button`
  ${Btn};
  ${({ theme }) => {
    const { colors } = theme;
    return css`
      background-color: ${colors.bgGray};
    `;
  }}
`;

const TagName = styled.span`
  font-size: 10px;

  ${({ theme }) => theme.device.tablet} {
    font-size: 12px;
  }

  &::before {
    content: "#";
  }
`;

const BorderBtn = styled.button`
  ${Btn};
  border: 1px solid ${({ theme }) => theme.colors.mainBlue};
  background-color: ${({ theme }) => theme.colors.white};
`;

const BorderText = styled.span`
  color: ${({ theme }) => theme.colors.mainBlue};
  font-size: 12px;
  font-weight: 700;

  &::after {
    margin-left: 3px;
    content: "X";
    font-weight: 700;
  }
`;

export default Tag;
