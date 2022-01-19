import React from "react";
import styled, { css } from "styled-components";
import LocationMap from "./LocationMap";
import CompanyCard from "./CompanyCard";
import MainText from "../elements/MainText";
import { flex } from "../mixin";

const OpeningBody = (props) => {
  const { companyName: company, content, locationDetail } = props;
  return (
    <>
      <MainTextBox>
        {content.split("\n\n").map((phrase, idx) => (
          <Phrase key={idx}>
            {phrase.split("\n").map((item, idx) => (
              <MainText key={idx}>{item}</MainText>
            ))}
          </Phrase>
        ))}
      </MainTextBox>

      <List>
        <DescBox>
          <DescTitle>마감일</DescTitle>
          <DescText>상시</DescText>
        </DescBox>

        <DescBox>
          <DescTitle>근무지역</DescTitle>
          <DescText>{locationDetail}</DescText>
        </DescBox>
        {locationDetail && <LocationMap location={locationDetail} />}
        {company && <CompanyCard company={company} />}
      </List>
    </>
  );
};

OpeningBody.defaultProps = {
  locationDetail: "",
  content: "",
  companyName: "",
};

const MainTextBox = styled.div`
  padding-top: 20px;
  padding-bottom: 60px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  ${({ theme }) => theme.device.tablet} {
    padding-bottom: 80px;
  }
`;

const Phrase = styled.div`
  padding: 5px 0;
`;

const List = styled.dl`
  padding: 20px 0;
`;

const DescBox = styled.div`
  ${flex};
  margin-bottom: 20px;
`;

const Desc = css`
  font-size: 15px;
  font-weight: 600;
`;

const DescTitle = styled.dt`
  ${Desc};
  flex-shrink: 0;
  width: 70px;
  color: ${({ theme }) => theme.colors.lightGray};
`;

const DescText = styled.dd`
  ${Desc};
`;

export default OpeningBody;
