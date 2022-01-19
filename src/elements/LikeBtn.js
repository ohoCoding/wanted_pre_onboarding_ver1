import React from "react";
import styled from "styled-components";
import { TiHeart } from "react-icons/ti";
import { flex } from "../mixin";

const LikeBtn = ({ isLike, children, _onClick }) => {
  return (
    <Btn isLike={isLike} onClick={_onClick}>
      <Like islike={`${isLike}`} />
      {children}
    </Btn>
  );
};

LikeBtn.defaultProps = {
  isLike: false,
};

const Btn = styled.button`
  ${flex};
  justify-content: center;
  position: absolute;
  right: 5px;
  top: 5px;
  width: 52px;
  height: 25px;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.heartGray};
  background: rgba(0, 0, 0, 0.3);
  border-radius: 3px;

  ${({ theme }) => theme.device.tablet} {
    right: 10px;
    top: 10px;
    width: 60px;
    height: 30px;
  }
`;

const Like = styled(TiHeart)`
  font-size: 22px;
  color: ${({ islike }) => (islike === "true" ? "red" : "#fff")};
`;

export default LikeBtn;
