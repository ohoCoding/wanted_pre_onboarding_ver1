import React from "react";
import styled from "styled-components";
import Image from "../elements/Image";

import { flex, flexColumn } from "../mixin";

const CompanyCard = (props) => {
  const { company } = props;
  return (
    <Container>
      <Left>
        <Image
          src="https://static.wanted.co.kr/images/wdes/0_5.83239bf4.jpg"
          size="50px"
          shape="square"
        />
        <TextBox>
          <Company>{company}</Company>
          <Category>IT, 컨텐츠</Category>
        </TextBox>
      </Left>
      <Right>
        <SubmitBtn>팔로우</SubmitBtn>
      </Right>
    </Container>
  );
};

CompanyCard.defaultProps = {
  company: "",
};

const Container = styled.article`
  ${flex};
  height: 60px;
  margin-top: 20px;
  justify-content: space-between;

  ${({ theme }) => theme.device.desktop} {
    height: 90px;
    padding: 30px 20px;
    border: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

const Left = styled.div`
  ${flex};
`;

const Right = styled.div``;

const TextBox = styled.div`
  ${flexColumn};
  align-items: flex-start;
  margin-left: 10px;
`;

const Company = styled.h5`
  margin-bottom: 5px;
  font-size: 15px;
  font-weight: 600;
`;

const Category = styled.p`
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.lightGray};
`;

const SubmitBtn = styled.button`
  padding: 7px 15px;
  border-radius: 3px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.lightBlue};
  font-size: 15px;
  font-weight: 600;

  ${({ theme }) => theme.device.desktop} {
    padding: 10px 30px;
  }
`;

export default CompanyCard;
