import React, { useState } from "react";
import styled from "styled-components";
import Image from "../elements/Image";
import Text from "../elements/Text";
import LikeBtn from "../elements/LikeBtn";
import { useDispatch } from "react-redux";
import { toggleLikeDB } from "../redux/modules/opening";
import { useSelector } from "react-redux";

const Card = (props) => {
  const dispatch = useDispatch();
  const { title, imgUrl, likeCount, companyName, openingId, isLike, _onClick } =
    props;
  const isLogin = useSelector((state) => state.user.is_login);

  const clickHeart = (e) => {
    e.stopPropagation();
    if (!isLogin) {
      alert("로그인 한 회원만 좋아요가 가능합니다.");
      return;
    }
    dispatch(toggleLikeDB(openingId, isLike));
  };

  return (
    <>
      <CardBox onClick={_onClick}>
        <LikeBtn isLike={isLike} _onClick={clickHeart}>
          {likeCount}
        </LikeBtn>
        <Image src={imgUrl} />

        <Text padding="15px">
          <Title>{title}</Title>
          <Company>{companyName}</Company>
          <Location>서울 · 한국</Location>
          <Compensation>채용보상금 1,000,000원</Compensation>
        </Text>
      </CardBox>
    </>
  );
};

const CardBox = styled.div`
  position: relative;
  width: 100%;
  max-height: 440px;
  padding-top: clac(300 / 1000 * 100%);
  // calc (이미지 높이 ÷ 이미지 가로 × 100 %)
  // border: 1px solid black;
  cursor: pointer;
`;

const Title = styled.div`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 1.3;
  ${({ theme }) => theme.device.tablet} {
    font-size: 18px;
  }
`;

const Company = styled.div`
  font-size: 11px;
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 1.6;
  ${({ theme }) => theme.device.tablet} {
    font-size: 14px;
  }
`;

const Location = styled.div`
  font-size: 11px;
  ${({ theme }) => theme.device.tablet} {
    font-size: 14px;
  }
  color: ${({ theme }) => theme.colors.lightGray};
  margin-bottom: 10px;
  line-height: 1.6;
`;

const Compensation = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray};
  margin-bottom: 10px;
`;

Card.defaultProps = {
  title: "",
  companyName: "",
  imgUrl: "",
};

export default Card;
