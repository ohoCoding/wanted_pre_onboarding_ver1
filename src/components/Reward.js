import React from "react";
import styled from "styled-components";
import { flex, hiddenDesktop } from "../mixin";
import Description from "../elements/Description";
import HeartBtn from "../elements/HeartBtn";

const Reward = (props) => {
  return (
    <Container>
      <HeartBtn heartNum="11" />
      <RewardBox>
        <div>
          <Title>채용보상금</Title>
          <List>
            <Description dt="추천인" dd="500,000원" />
            <Description dt="지원자" dd="500,000원" />
          </List>
        </div>
      </RewardBox>
    </Container>
  );
};

const Container = styled.div`
  ${hiddenDesktop};
`;

const RewardBox = styled.div`
  margin-bottom: 30px;
  padding: 20px;
  margin-top: 20px;
  background-color: ${({ theme }) => theme.colors.bgGray};
`;

const Title = styled.h5`
  margin-bottom: 15px;
  font-size: 15px;
  font-weight: 600;
`;

const List = styled.dl`
  ${flex};
`;

export default Reward;
