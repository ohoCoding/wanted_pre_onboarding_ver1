import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { TiHeart } from "react-icons/ti";
import { flex } from "../mixin";
import { toggleLikeDB } from "../redux/modules/opening";
import { history } from "../redux/configStore";

const HeartBtn = (props) => {
  const dispatch = useDispatch();

  const pathnameAry = history.location.pathname.split("/");
  const openingId = Number(pathnameAry[pathnameAry.length - 1]);

  const { likeCnt } = useSelector((state) => state.opening.currentOpening);
  const myLikeList = useSelector((state) => state.user.user.likeIdLIst) || [];
  const isLogin = useSelector((state) => state.user.is_login);

  let isLike =
    myLikeList.findIndex((item) => item === openingId) !== -1 ? true : false;

  const toggleLike = () => {
    if (!isLogin) {
      alert("로그인 한 회원만 좋아요가 가능합니다.");
      return;
    }
    dispatch(toggleLikeDB(openingId, isLike));
  };

  return (
    <Btn onClick={toggleLike}>
      <Heart isLike={`${isLike}`} />
      <HeartNum>{likeCnt}</HeartNum>
    </Btn>
  );
};

HeartBtn.defaultProps = {
  heartNum: 0,
};

const Btn = styled.button`
  ${flex};
  gap: 5px;
  padding: 3px 15px;
  border: 1px solid ${({ theme }) => theme.colors.heartGray};
  border-radius: 15px;
  color: ${({ theme }) => theme.colors.heartGray};
`;

const Heart = styled(TiHeart)`
  font-size: 22px;
  color: ${({ isLike }) => (isLike === "true" ? "red" : "initial")};
`;

const HeartNum = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: initial;
`;

export default HeartBtn;
