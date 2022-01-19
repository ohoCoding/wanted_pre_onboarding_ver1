import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Box from "../elements/Box";
import Text from "../elements/Text";
import Tag from "../elements/Tag";
import { flex } from "../mixin";
import { GrClose } from "react-icons/gr";
import { useSelector, useDispatch } from "react-redux";
import {
  getSecondTagsDB,
  getTagResultsDB,
  getTagsDB,
} from "../redux/modules/opening";

const TagModal = ({showModal, closeModal}) => {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.opening.tags) || [];
  const secondTags = useSelector((state) => state.opening.secondTag) || [];

  const [choices, setChoices] = useState([]);

  useEffect(() => dispatch(getTagsDB()), []);

  const clickCategory = (id) => {
    dispatch(getSecondTagsDB(id));
  };

  const choiceTag = (name) => {
    if (
      choices.length !== 0 &&
      choices.findIndex((ele) => ele === name) !== -1
    ) {
      const newAry = choices.filter((ele) => ele !== name);
      setChoices(newAry);
      return;
    }
    if (choices.length >= 1) {
      alert("태그는 1개만 선택 가능합니다.");
      return;
    }
    setChoices([...choices, name]);
  };

  const resetChoices = () => {
    setChoices([]);
  };

  const submitTags = () => {
    dispatch(getTagResultsDB(choices[0]));
    closeModal();
  };

  return (
    <>
      {showModal ? (
        <ModalContainer>
          <ModalOverlay onClick={closeModal} />
          <ModalContent>
            <ModalHeader>
              <Text _onClick={resetChoices} pointer={true}>
                초기화
              </Text>
              <Text bold size="16px">
                태그
              </Text>
              <button onClick={closeModal}>
                <GrClose />
              </button>
            </ModalHeader>
            <ModalBody>
              <Box>
                <MainText>
                  기업의 특별한 복지, 혜택 등 태그를 선택하여
                  <br />
                  나에게 꼭 맞는 포지션을 찾아보세요!
                </MainText>
                <br />
                <Box>
                  <Subtitle>1. 카테고리 선택</Subtitle>
                  <CategoriBox>
                    {categoryList.map((item, idx) => {
                      return (
                        <li key={idx} onClick={() => clickCategory(item.id)}>
                          <CategoriBtn>{item.name}</CategoriBtn>
                        </li>
                      );
                    })}
                  </CategoriBox>
                </Box>
                <Box>
                  <Subtitle>2. 태그 선택</Subtitle>
                  <TagBox>
                    {secondTags.map((item, idx) => {
                      // 첫 번째 규칙(뒤의 %를 모두 뺌)
                      let convertName;

                      convertName = isNaN(
                        Number(item.name[item.name.length - 1])
                      )
                        ? item.name
                        : item.name + "%";

                      if (item.name === "퇴사율205%25이하") {
                        convertName = "퇴사율5%이하";
                      }

                      return (
                        <li key={idx} onClick={() => choiceTag(item.name)}>
                          <Tag name={convertName} />
                        </li>
                      );
                    })}
                  </TagBox>
                </Box>
              </Box>
            </ModalBody>
            <ModalFooter>
              <SelectedTags>
                {choices.map((item, idx) => (
                  <Tag
                    key={idx}
                    name={item}
                    selected
                    _onClick={() => {
                      const newAry = choices.filter((ele) => ele !== item);
                      setChoices(newAry);
                    }}
                  ></Tag>
                ))}
              </SelectedTags>
              <ConfirmBtn onClick={submitTags}>확인</ConfirmBtn>
            </ModalFooter>
          </ModalContent>
        </ModalContainer>
      ) : null}
    </>
  );
};

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;

const ModalOverlay = styled.div`
  display: none;

  ${({ theme }) => theme.device.tablet} {
    display: initial;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
  }
`;

const ModalContent = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

  ${({ theme }) => theme.device.tablet} {
    width: 500px;
    height: initial;
    min-height: 525px;
    position: relative;
    top: 0px;
  }
`;

const MainText = styled.h2`
  font-size: 14px;
  font-weight: 700;
  line-height: 18px;
`;

const Subtitle = styled.h3`
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 7px;
`;

const ModalHeader = styled.div`
  ${flex};
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;

  ${({ theme }) => theme.device.tablet} {
    width: 500px;
  }
`;

const ModalBody = styled.div`
  padding: 20px;
`;

const ModalFooter = styled.div`
  padding: 0 20px 20px;
`;

const CategoriBox = styled.div`
  ${flex};
  margin-top: 10px;
  white-space: nowrap;
  overflow-x: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  ${({ theme }) => theme.device.tablet} {
    flex-wrap: wrap;
  }
`;

const CategoriBtn = styled.button`
  flex-shrink: 0;
  padding: 9px 14px;
  margin-bottom: 10px;
  margin-right: 6px;
  border-radius: 25px;
  background-color: ${({ theme }) => theme.colors.bgGray};
`;

const TagBox = styled.div`
  ${flex};
  flex-wrap: wrap;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};

  ${({ theme }) => theme.device.tablet} {
    width: 466px;
    min-height: 100px;
  }
`;

const SelectedTags = styled.div`
  ${flex};
  height: 96px;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.bgGray};

  ${({ theme }) => theme.device.tablet} {
    height: 116px;
  }
`;

const ConfirmBtn = styled.button`
  ${flex};
  justify-content: center;
  width: 100%;
  height: 50px;
  margin-top: 20px;
  border: 1px solid ${({ theme }) => theme.colors.mainBlue};
  border-radius: 50px;
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.mainBlue};
`;

export default TagModal;
