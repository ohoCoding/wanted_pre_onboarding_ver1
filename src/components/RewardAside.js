import React from "react";
import styled, { css } from "styled-components";
import Description from "../elements/Description";
import HeartBtn from "../elements/HeartBtn";
import { flex } from "../mixin";
import { VscBookmark } from "react-icons/vsc";

const RewardAside = (props) => {
  const { like } = props;

  return (
    <RewardBox>
      <Title>채용보상금</Title>
      <List>
        <Description dt="추천인" dd="500,000원" />
        <Description dt="지원자" dd="500,000원" />
      </List>
      <Btns>
        <OutlineBtn>
          <Bookmark />
          북마크하기
        </OutlineBtn>
        <FillBtn>지원하기</FillBtn>
      </Btns>
      <HeartBtn heartNum={like} />
    </RewardBox>
  );
};

RewardAside.defaultProps = {
  like: 0,
};

const RewardBox = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
`;

const Title = styled.h5`
  margin-bottom: 25px;
  font-size: 15px;
  font-weight: 600;
`;

const List = styled.dl`
  ${flex};
  align-items: flex-start;
  gap: 10px;
`;

const Btns = styled.div`
  padding: 20px 0;
`;

const RewardBtn = css`
  ${flex};
  justify-content: center;
  width: 100%;
  height: 50px;
  border: 1px solid ${({ theme }) => theme.colors.mainBlue};
  border-radius: 50px;
  font-size: 16px;
  font-weight: 700;
`;

const OutlineBtn = styled.button`
  ${RewardBtn};
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.mainBlue};
`;

const FillBtn = styled.button`
  ${RewardBtn};
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.mainBlue};
`;

const Bookmark = styled(VscBookmark)`
  font-size: 18px;
  margin-top: 2px;
  margin-right: 3px;
`;

export default RewardAside;
