import React from "react";
import styled from "styled-components";

const IconBtn = (props) => {
  const { icon, show, _onClick } = props;
  return <Btn onClick={_onClick} show={show ? show : null}>{icon}</Btn>;
};

IconBtn.defaultProps = {
  icon: "",
  show: "",
  _onClick: () => {},
};

const Btn = styled.button`
  padding: 0 10px;
  font-size: 18px;
`;



export default IconBtn;
