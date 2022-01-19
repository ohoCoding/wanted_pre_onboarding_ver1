import React, { useState } from "react";
import styled from "styled-components";
import FilterBtn from "../elements/FilterBtn";
import Text from "../elements/Text";
import { container, flex } from "../mixin";
import { AiOutlineCaretDown } from "react-icons/ai";
import TagModal from "./TagModal";
import LoginModal from "./modal/LoginModal";
import CareerModal from "./CareerModal";
import { useSelector } from "react-redux";

const FilterHeader = () => {
  const isLogin = useSelector((state) => state.user.is_login) || false;
  const [showModal, setShowModal] = useState(false);
  const [isTag, setIsTag] = useState(false);
  const [isCareer, setIsCareer] = useState(false);
  const [currentCareer, setCurrentCareer] = useState("전체");

  const openTagModal = () => {
    setIsTag(true);
    setIsCareer(false);
    setShowModal(true);
  };

  const openCareerModal = () => {
    setIsCareer(true);
    setIsTag(false);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {isTag && isLogin && (
        <TagModal isTag={isTag} showModal={showModal} closeModal={closeModal} />
      )}
      {isCareer && isLogin && (
        <CareerModal
          showModal={showModal}
          closeModal={closeModal}
          current={currentCareer}
          _onSubmit={(career) => setCurrentCareer(career)}
        />
      )}
      {!isLogin && <LoginModal showModal={showModal} closeModal={closeModal} />}
      <Container>
        <Box>
          <FilterBox>
            <FilterBtn _onClick={openTagModal} width="217px">
              <Text margin="0 8px 0 0">태그</Text>
              <Text margin="" color="gray">
                딱 맞는 기업찾기
              </Text>
              <DownMark />
            </FilterBtn>

            <FilterBtn width="120px">
              <Text margin="0 8px 0 0">지역</Text>
              <Text bold color="#3366FF">
                한국
              </Text>
              <DownMark />
            </FilterBtn>
            <FilterBtn _onClick={openCareerModal} width="120px">
              <Text margin="0 8px 0 0">경력</Text>
              <Text bold color="#3366FF">
                {currentCareer}
              </Text>
              <DownMark />
            </FilterBtn>
          </FilterBox>

          <FilterBtn width="104px" margin="0px">
            <Text>최신순 </Text>
            <DownMark />
          </FilterBtn>
        </Box>
      </Container>
    </>
  );
};

const Container = styled.div`
  min-width: 650px;
  padding-top: 30px;
  margin-bottom: 20px;
`;

const Box = styled.div`
  ${container};
  ${flex};
  margin-bottom: 19px;
  padding-top: 10px;

  justify-content: space-between;
  ${({ theme }) => theme.device.tablet} {
  }
  @media screen and (max-width: 767px) {
    overflow-x: auto;
  }
`;

const FilterBox = styled.div`
  ${flex};
  width: 100%;
  @media screen and (max-width: 767px) {
    overflow-x: auto;
  }
`;

const DownMark = styled(AiOutlineCaretDown)``;

export default FilterHeader;
