import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Btn from '../../components/Btn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { ClassicSpinner } from 'react-spinners-kit';
import * as Api from '../../api';
import styled from 'styled-components';
import {
  RegisterInput,
  RegisterText,
  WarningText,
} from '../../styles/RegisterStyle';
import { validateEmail } from '../../utils/validation';
import LandingNav from '../../components/nav/LandingNav';
import snackBar from '../../components/snackBar';

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const emailRef = useRef();
  const [checkState, setCheckState] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);
  const [openLoading, setOpenLoading] = useState(false);

  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 4;
  const isPasswordSame = password === confirmPassword;
  const isNameValid = name.length >= 2;

  const isFormValid =
    isEmailValid && isPasswordValid && isPasswordSame && isNameValid;

  const isEmailDuplicate = async (e) => {
    e.preventDefault();
    if (isEmailValid) {
      setOpenLoading(true);
      setTimeout(async () => {
        try {
          const post = await Api.post('user/signup/check', {
            email,
          });
          if (post.data === false) {
            setOpenLoading(false);
            setCheckState(true);
            setCheckEmail(true);
            snackBar('sucess', '사용 가능한 이메일 입니다. ');
          } else {
            setOpenLoading(false);
            snackBar('warning', '중복된 이메일입니다');
          }
        } catch (error) {
          if (error.response) {
            setOpenLoading(false);
            snackBar('error', '중복체크 중 에러가 발생했습니다.');
          }
        }
      }, 1500);
    } else {
      snackBar('warning', '올바른 이메일 형식을  입력해주세요!');
    }
  };

  const handleSubmit = async () => {
    if (checkEmail) {
      try {
        const response = await Api.post('user/signup', {
          email,
          pw: password,
          name,
        });
        if (response.data === true) {
          snackBar('sucess', '회원가입에 성공하였습니다.');
          navigate('/login');
        } else {
          snackBar('error', '회원가입에 실패하였습니다.');
        }
      } catch (err) {
        snackBar('sucess', '회원가입에 성공하였습니다.');
      }
    } else {
      snackBar('warning', '이메일 중복  확인해주세요.');
    }
  };

  return (
    <Container>
      <LandingNav />
      <RegisterContainer id="RC">
        <div onSubmit={handleSubmit}>
          <div style={{ marginBottom: '30px' }}>
            <RegisterText>📧 이메일 주소 </RegisterText>
            <RegisterInput
              type="email"
              autoComplete="off"
              value={email}
              ref={emailRef}
              onChange={(e) => setEmail(e.target.value)}
            />
            <IconWrapper onClick={isEmailDuplicate} color={checkState}>
              {openLoading ? (
                <ClassicSpinner size={20} color="pink" />
              ) : (
                <FontAwesomeIcon icon={faCircleCheck} className="user" />
              )}
            </IconWrapper>
            {!isEmailValid && (
              <WarningText>이메일 형식이 올바르지 않습니다.</WarningText>
            )}
          </div>

          <div style={{ marginBottom: '30px' }}>
            <RegisterText>🔑 비밀번호</RegisterText>
            <RegisterInput
              type="password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!isPasswordValid && (
              <WarningText>
                비밀번호는 4글자 이상으로 설정해 주세요.
              </WarningText>
            )}
          </div>

          <div style={{ marginBottom: '30px' }}>
            <RegisterText> ✅ 비밀번호 재확인</RegisterText>
            <RegisterInput
              type="password"
              autoComplete="off"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {!isPasswordSame && (
              <WarningText>비밀번호가 일치하지 않습니다.</WarningText>
            )}
          </div>

          <div style={{ marginBottom: '30px' }}>
            <RegisterText> 🔖 닉네임</RegisterText>
            <RegisterInput
              type="text"
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {!isNameValid && (
              <WarningText>닉네임은 2글자 이상으로 설정해 주세요.</WarningText>
            )}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Btn
              text={'회원가입'}
              type={'sub'}
              disabled={!isFormValid}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </RegisterContainer>
    </Container>
  );
};

export default Register;

const RegisterContainer = styled.div`
  display: grid;
  place-items: center;
  margin-top: 100px;
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(to top, #09203f 0%, #537895 100%);
`;

const IconWrapper = styled.div`
  color: ${(prop) => (prop.color ? 'pink' : '#808080')};
  font-size: 20px;
  position: absolute;
  top: 38px;
  right: 10px;
  left: 430px;
  width: 10px;
  cursor: pointer;
  :hover {
    color: pink;
  }
`;
