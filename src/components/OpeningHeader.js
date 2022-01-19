import React from "react";
import styled from "styled-components";
import Tags from "./Tags";
import Reward from "../components/Reward";
import { flexColumn } from "../mixin";

const OpeningHeader = (props) => {
  const { title, companyName: company, location, tags } = props;

  return (
    <Box>
      <Title>{title}</Title>
      <CompanyInfo>
        <Company>{company}</Company>
        <Location>{location}</Location>
      </CompanyInfo>
      <Tags tags={tags} />
      <Reward />
    </Box>
  );
};

OpeningHeader.defaultProps = {
  title: "",
  companyName: "",
  location: "",
  tags: [],
};

const Box = styled.div`
  padding: 20px 0;

  ${({ theme }) => theme.device.tablet} {
    padding: 20px;
  }

  ${({ theme }) => theme.device.desktop} {
    padding: 20px 0;
  }
`;

const Title = styled.h2`
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 600;

  ${({ theme }) => theme.device.tablet} {
    font-size: 22px;
  }
`;

const CompanyInfo = styled.div`
  ${flexColumn};
  align-items: flex-start;

  ${({ theme }) => theme.device.tablet} {
    flex-direction: row;
  }
`;

const Company = styled.h6`
  font-size: 11px;
  font-weight: 600;

  ${({ theme }) => theme.device.tablet} {
    font-size: 14px;
  }
`;

const Location = styled.p`
  font-size: 11px;

  ${({ theme }) => theme.device.tablet} {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.lightGray};

    &::before {
      content: "|";
      margin: 0 5px;
    }
  }
`;

export default OpeningHeader;
