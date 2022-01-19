import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { history } from "../redux/configStore";
import styled from "styled-components";
import Text from "../elements/Text";
import { flex } from "../mixin";

import { GrClose } from "react-icons/gr";
import { getCareerResultsDB } from "../redux/modules/opening";

const CareerModal = ({ showModal, closeModal, current, _onSubmit }) => {
  const dispatch = useDispatch();
  const [career, setCareer] = useState(current);

  const clickCareer = (career) => {
    history.push({
      pathname: "/",
      search: `?career=${career}`,
    });
    _onSubmit(career);
    dispatch(getCareerResultsDB(career));
    closeModal();
  };

  return (
    <>
      {showModal ? (
        <ModalContainer>
          <ModalOverlay onClick={closeModal}></ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <div>
                <Text bold size="16px">
                  경력
                </Text>
              </div>
              <button onClick={closeModal}>
                <GrClose />
              </button>
            </ModalHeader>
            <ModalBody>
              <Select
                onChange={(e) => setCareer(e.target.value)}
                value={career}
              >
                <option>전체</option>
                <option>신입</option>
                <option>경력</option>
              </Select>
            </ModalBody>
            <ModalFooter>
              <Btn onClick={() => clickCareer(career)}>확인</Btn>
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
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  position: absolute;
`;

const ModalContent = styled.div`
  position: relative;
  width: 90%;
  background-color: white;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

  ${({ theme }) => theme.device.tablet} {
    width: 360px;
    height: 320px;
    top: 0px;
  }
`;

const ModalHeader = styled.div`
  ${flex};
  justify-content: space-between;
  padding: 16px 20px;
  ${({ theme }) => theme.device.tablet} {
    width: 360px;
  }
`;

const ModalBody = styled.div`
  padding: 70px 25px 46px;
`;

const Select = styled.select`
  width: 100%;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 5px;
  padding: 0 15px;

  // -moz-appearance:none;
  // -webkit-appearance:none;
  // appearance:none;
  // select::-ms-expand { display:none; }

  // background:
`;

const ModalFooter = styled.div`
  padding: 40px 20px 20px;
`;

const Btn = styled.button`
  width: 100%;
  height: 54px;
  margin: 0 0 10px 0;
  border-radius: 27px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  background-color: ${({ theme }) => theme.colors.mainBlue};
`;

export default CareerModal;
