import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import OpeningHeader from "../components/OpeningHeader";
import OpeningBody from "../components/OpeningBody";

import Image from "../elements/Image";
import { container, flex, onlyDesktop } from "../mixin";
import RewardAside from "../components/RewardAside";
import {
  getOpeningDetailDB,
  removeCurrentOpening,
} from "../redux/modules/opening";

const Opening = (props) => {
  const {
    match: {
      params: { openingId },
    },
  } = props;

  const dispatch = useDispatch();

  const openingData =
    useSelector((state) => state.opening.currentOpening) || null;

  useEffect(() => {
    dispatch(getOpeningDetailDB(parseInt(openingId)));
    return () => dispatch(removeCurrentOpening());
  }, []);

  if (openingData) {
    const {
      title,
      companyName,
      content,
      imgUrl,
      location,
      locationDetail,
      tags,
      likeCnt,
    } = openingData;
    const HeaderInfo = { title, companyName, location, tags };
    const BodyInfo = { companyName, content, locationDetail };
    return (
      <Container>
        <LeftBox>
          <ImageContainer>
            {imgUrl && <Image src={imgUrl} alt="공고사진" />}
          </ImageContainer>
          <ContentBox>
            <OpeningHeader {...HeaderInfo} />
            <OpeningBody {...BodyInfo} />
          </ContentBox>
        </LeftBox>
        <RightBox>
          <RewardAside like={likeCnt} />
        </RightBox>
      </Container>
    );
  }

  return <></>;
};

const Container = styled.main`
  width: 100%;
  margin: 0 auto;

  ${({ theme }) => theme.device.desktop} {
    ${flex};
    align-items: flex-start;
    gap: 25px;
    max-width: 1120px;
    padding: 0 40px;
  }
`;

const LeftBox = styled.section`
  width: 100%;

  ${({ theme }) => theme.device.desktop} {
    max-width: 700px;
  }
`;

const RightBox = styled.aside`
  ${onlyDesktop};
  position: sticky;
  top: 20px;
  flex-grow: 1;
  flex-shrink: 0;
  min-width: 300px;
  margin-top: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 3px;
`;

const ImageContainer = styled.div`
  ${({ theme }) => theme.device.tablet} {
    margin: 20px 40px 0 40px;
  }

  ${({ theme }) => theme.device.desktop} {
    margin: 20px 0 0 0;
  }
`;

const ContentBox = styled.div`
  ${container};
  position: relative;

  ${({ theme }) => theme.device.desktop} {
    padding: 0;
  }
`;

export default Opening;
