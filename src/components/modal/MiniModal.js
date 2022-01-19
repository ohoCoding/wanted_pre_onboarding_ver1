import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../redux/configStore";
import styled from "styled-components";
import {container} from "../../mixin";
import Text from "../../elements/Text";
import { flex } from "../../mixin";
import { actionCreators as userActions } from "../../redux/modules/user";

import { GrClose } from "react-icons/gr";
import Logo from "../../assets/wanted-logo.png";


const MiniModal = ({ showModal, closeModal, current, _onSubmit }) => {
  const dispatch = useDispatch();
  

  const clickLogout = () => {
      dispatch(userActions.logoutDB());
  }

  return (
    <>
      {showModal ? (
        <ModalContainer>
          <ModalOverlay onClick={closeModal}></ModalOverlay>
          <ModalContent>
           <HiddenHeader>
               <HiddenDiv>
                   <HiddenDiv>
                       <ModalLogo src={Logo} />
                   </HiddenDiv>
                   <HiddenDiv>
                       <button onClick={closeModal}>
                          <GrClose />
                       </button>
                    </HiddenDiv>
               </HiddenDiv>
           </HiddenHeader>
            <ModalHeader>
                <Btn onClick={() => {
                  history.push("/mypage");
                }}><Word>MY 원티드</Word></Btn>
                <Btn><Word>프로필</Word></Btn>
            </ModalHeader>
            <ModalBody>
              <Btn><Word>지원현황</Word></Btn>
              <Btn><Word>제안받기 현황</Word></Btn>
              <Btn><Word>좋아요</Word></Btn>
              <Btn><Word>북마크</Word></Btn>
            </ModalBody>
            <ModalFooter>
              <Btn><Word>추천</Word></Btn>
              <Btn><Word>포인트</Word></Btn>
            </ModalFooter>
            <LogoutSection>
                <Btn onClick={clickLogout}><WordLogout>로그아웃</WordLogout></Btn>
            </LogoutSection>
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

  width: 100%;
  height: 100%;
  position: absolute;
`;

const ModalContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: 5px;
  background-color: white;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  

  ${({ theme }) => theme.device.tablet} {
    width: 197px;
    height: 383px;
    position:fixed;
    top: 80px;
    left: 72%;

    &:after{
        border-top:0px solid transparent;
        border-left: 10px solid transparent;
        border-right: 25px solid transparent;
        border-bottom: 25px solid white;
        content:"";
        position:absolute;
        top:-10px;
        left:160px;
        
    }
  }
`;

const ModalLogo = styled.img`
  width: 90px;
  height: 30px;
`;

const HiddenDiv = styled.div`
${({ theme }) => theme.device.tablet} {
    display:none;
  }
  height: 30px;
  display:flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 10px 10px 10px;
`;



const HiddenHeader = styled.div`
${({ theme }) => theme.device.tablet} {
    height: 0
    
  }
  height: 90px;
`;

const ModalHeader = styled.div`
  padding: 7px 0;
  width: 95%;
  margin: 0 auto;
  border-bottom: 2px solid ${({ theme }) => theme.colors.bgGray};
  

`;

const ModalBody = styled.div`
  padding: 7px 0;
  width: 95%;
  margin: 0 auto;
  border-bottom: 2px solid ${({ theme }) => theme.colors.bgGray};
`;



const ModalFooter = styled.div`
  padding: 7px 0;
  width: 95%;
  margin: 0 auto;
  border-bottom: 2px solid ${({ theme }) => theme.colors.bgGray};
  ${({ theme }) => theme.device.tablet} {
   border: none;
  }
  
`;

const LogoutSection = styled.div`
  width: 95%;
  margin: 0 auto;
  background-color: white;
  color: ${({ theme }) => theme.colors.lightGray};
  ${({ theme }) => theme.device.tablet} {
    // background-color: ${({ theme }) => theme.colors.bgGray};
  }
`;

const Btn = styled.button`
  width: 100%;
  height: 35px;
  border-radius: 5px;
  color: black;
  text-align: left;
  margin-bottom: 18px;
  padding: 15px;


  ${({ theme }) => theme.device.tablet} {
    font-size: 14px;
    margin: 0;
    padding: 0;
    text-align: center;
    &:hover{
        transition: all 0.3s ease-in-out;
        background-color: ${({ theme }) => theme.colors.bgGray};
      }
}

  
`;

const WordLogout = styled.span`
  ${({ theme }) => theme.device.tablet} {
   font-size: 14px;
   color: black;
  }
  font-size: 20px;
  color: ${({ theme }) => theme.colors.lightGray};
`;

const Word = styled.span`
${({ theme }) => theme.device.tablet} {
    font-size: 14px;
   }
   font-size: 20px;
  
   
`;


export default MiniModal;
