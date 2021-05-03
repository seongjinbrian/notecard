import styled from 'styled-components';

export const OuterBox = styled.div`
  margin-top: 8em;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const IconContainer = styled.div`
  width: 33px;
  height: 33px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  &:not(:last-child) {
    margin-right: 1rem;
  }
  img {
    width: 70%;
  }
`;
export const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const AuthContainer = styled.div`
  text-align: center;
`;

export const AuthTitle = styled.h4`
  color: gray;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;