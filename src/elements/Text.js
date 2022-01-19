import React from "react";
import styled from "styled-components";

const Text = ({ _onClick, children, ...rest }) => {
  return (
    <TextBox {...rest} onClick={_onClick}>
      {children}
    </TextBox>
  );
};

Text.defaultProps = {
  bold: false,
  color: "#333",
  size: "14px",
  margin: false,
  padding: false,
  line_height: false,
  pointer: false,
  _onClick: () => {},
};

const TextBox = styled.span`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold ? "600" : "400")};
  cursor: ${(props) => (props.pointer ? "pointer" : "initial")};
  ${(props) => (props.line_height ? `line-height: ${props.line_height};` : "")};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")};
`;

export default Text;
