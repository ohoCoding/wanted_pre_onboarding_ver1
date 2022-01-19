import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { actionCreators as userActions } from "../../redux/modules/user";

import Box from "../../elements/Box";
import Text from "../../elements/Text";
import Logo from "../../assets/wanted-logo.png";
import { flex } from "../../mixin";
import { GrClose } from "react-icons/gr";
import { HiOutlineMail } from "react-icons/hi";

const LoginModal = (props) => {
  const dispatch = useDispatch();
  const [loginMode, setLoginMode] = useState(true);

  const { history, showModal, closeModal } = props;

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    passwordCheck: "",
    name: "",
  });

  let regExp =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  const clickCloseBtn = () => {
    setLoginMode(true);
    setUserInfo({
      email: "",
      password: "",
      passwordCheck: "",
      name: "",
    });
    closeModal();
  };

  const clickLogin = () => {
    const { email, password } = userInfo;
    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    }

    if (email.match(regExp) === null) {
      alert("이메일 형식이 맞는지 확인해주세요.");
      return;
    }

    if (!password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    dispatch(userActions.loginDB({ email, password }));
    closeModal();
  };

  const clickSignUp = () => {
    const { name, email, password, passwordCheck } = userInfo;
    if (name.length <= 2) {
      alert("이름은 두 글자 이상 입력해주세요.");
      return;
    }

    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    }

    if (email.match(regExp) === null) {
      alert("이메일 형식이 맞는지 확인해주세요.");
      return;
    }

    if (!password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    if (password !== passwordCheck) {
      alert("비밀번호와 비밀번호 확인이 다릅니다.");
      return;
    }

    dispatch(userActions.signUpDB({ name, email, password }));
    closeModal();
  };

  return (
    <>
      {showModal ? (
        <ModalContainer>
          <ModalOverlay onClick={clickCloseBtn} />
          <ModalContent>
            <ModalHeader>
              <Box>
                <ModalLogo src={Logo} />
              </Box>
              <button onClick={clickCloseBtn}>
                <GrClose />
              </button>
            </ModalHeader>
            <ModalBody>
              <Box text_align="center" margin="24px 0px 40px">
                <Text line_height="1.54" bold size="26px">
                  지금 원티드에서
                  <br />딱 맞는 회사찾기
                </Text>
                <Box margin="16px 0 0 0" text_align="center">
                  <Text size="16px">나에게 딱 맞는 회사를 찾아보세요</Text>
                </Box>
              </Box>
              <Box>
                {!loginMode && (
                  <Box padding="0 0 22px 0">
                    <label>이름</label>
                    <Input
                      onChange={(e) =>
                        setUserInfo({ ...userInfo, name: e.target.value })
                      }
                      value={userInfo.nickname}
                    />
                  </Box>
                )}
                <Box padding="0 0 22px 0">
                  <label>이메일</label>
                  <Input
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, email: e.target.value })
                    }
                    value={userInfo.email}
                  />
                </Box>
                <Box padding="0 0 22px 0">
                  <label>비밀번호</label>
                  <Input
                    type="password"
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, password: e.target.value })
                    }
                    value={userInfo.password}
                  />
                </Box>
                {!loginMode && (
                  <Box padding="0 0 22px 0">
                    <label>비밀번호 확인</label>
                    <Input
                      type="password"
                      onChange={(e) =>
                        setUserInfo({
                          ...userInfo,
                          passwordCheck: e.target.value,
                        })
                      }
                      value={userInfo.passwordCheck}
                    />
                  </Box>
                )}
              </Box>
              <Box>
                <EmailBtn
                  onClick={loginMode === true ? clickLogin : clickSignUp}
                >
                  <HiOutlineMail />
                  {loginMode ? "로그인하기" : "회원가입하기"}
                </EmailBtn>
              </Box>
              <Box
                text_align="center"
                padding="5px 0"
                _onClick={() => setLoginMode(!loginMode)}
              >
                <Text bold>{loginMode ? "회원가입" : "로그인"}</Text>
              </Box>
              <P>
                걱정마세요! 여러분의 지원 활동은 SNS에 노출되지 않습니다.
                <br />
                회원가입 시{" "}
                <a href="https://help.wanted.co.kr/hc/ko/articles/360035484292">
                  개인정보 처리방침
                </a>
                과{" "}
                <a href="https://help.wanted.co.kr/hc/ko/articles/360035844551">
                  이용약관
                </a>
                을 확인하였으며,
                <br />
                동의합니다.
              </P>
            </ModalBody>
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
  z-index: 60;

  ${({ theme }) => theme.device.tablet} {
    position: absolute;
    display: initial;
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
  z-index: 70;
  ${({ theme }) => theme.device.tablet} {
    width: 400px;
    height: initial;
    overflow-y: auto;
    min-height: 750px;
    position: relative;
    top: 0px;
  }
`;

const ModalHeader = styled.div`
  ${flex};
  padding: 16px 20px;

  ${({ theme }) => theme.device.tablet} {
    width: 400px;
    justify-content: space-between;
  }
`;

const ModalLogo = styled.img`
  width: 75px;
`;

const ModalBody = styled.div`
  padding: 20px;
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  padding: 0 10px;
  border: 2px solid ${({ theme }) => theme.colors.bgGray};
  border-radius: 5px;
  margin-top: 10px;
`;

// const ErrInput = styled.input`
//   width: 100%;
//   height: 50px;
//   border: 2px solid red;
//   border-radius: 5px;
//   margin-top: 10px;
// `;

const EmailBtn = styled.button`
  ${flex};
  gap: 5px;
  justify-content: center;
  width: 100%;
  height: 54px;
  margin: 0 0 10px 0;
  border-radius: 27px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  background-color: ${({ theme }) => theme.colors.mainBlue};
`;

const Btn = styled.button`
  width: 100%;
  height: 54px;
  margin: 0 0 10px 0;
  border-radius: 27px;
  font-size: 16px;
  font-weight: 600;

  border: 2px solid ${({ theme }) => theme.colors.bgGray};
`;

const P = styled.p`
  margin-top: 26px;
  text-align: center;
  font-size: 12px;
  line-height: 18px;
`;

export default LoginModal;
