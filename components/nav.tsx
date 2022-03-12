import styled from "styled-components";
import Image from "next/image";
import { useEffect, useState } from "react";
const nav = () => {
  const [scrollState, setScrollState] = useState<number>(0);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10 && window.scrollY < 120) {
        setScrollState(window.scrollY);
      } 
      else if(window.scrollY < 2) {
        setScrollState(window.scrollY);
      }
      return window.removeEventListener("scroll", () => {
        console.log("삭제");
      });
    });
  });
  return (
    <>
      <MainNavContainer scrollState={scrollState}>
        <Logo>
          <Image src={"/icon/brandLogo.png"} width={150} height={110}></Image>
        </Logo>
        <UlContainer>
          <LiItem className="hover">반려동물 이야기</LiItem>
          <LiItem className="hover">예약하기</LiItem>
          <LiItem className="hover">
            <Image src={"/backgroundImage/addMarket.png"} width={20} height={20}></Image>
            매장등록
            </LiItem>
          <SearchBox>
            <SearchBoxInput placeholder="어떤 서비스를 찾고 계신가요?"></SearchBoxInput>
            <SearchBtn className="hover">검색</SearchBtn>
          </SearchBox>
          <MyPageToolBox>
            <Image
              className="hover"
              src={"/icon/mypage.png"}
              width={33}
              height={30}
            ></Image>
          </MyPageToolBox>
        </UlContainer>
      </MainNavContainer>
      <MobileNavContainer scrollState={scrollState}>
        <MobileMenu>
          <Image src={"/icon/menu.png"} width={"100%"} height={"100%"}></Image>
        </MobileMenu>
        <Logo>
          <Image src={"/icon/brandLogo.png"} width={150} height={110}></Image>
        </Logo>
        <MyPageToolBox>
          <Image src={"/icon/mypage.png"} width={33} height={30}></Image>
        </MyPageToolBox>
      </MobileNavContainer>
    </>
  );
};

export default nav;

const MainNavContainer = styled.div.attrs(() => {})`
  display: flex;
  width: 100%;
  height: 120px;
  color: white;
  padding-bottom: 10px;
  /* background:url("backgroundImage/grassNav.jpg"); */
  /* background: ${(props) =>
    props.scrollState ? "rgba(55, 49, 49, 0.7)" : "none"}; */
  border-bottom: ${(props) => (props.scrollState ? `2px solid rgb(181, 214, 146, ${props.scrollState / 100})` : "none")};
  &::after {
    width: 100%;
    height: 100vh;
    content: "";
    background-color: ${(props) =>
      props.scrollState ? `rgb(181, 214, 146, ${props.scrollState / 100})` : "none"};
    /* filter: brightness(70%); */
    position: absolute;
    top: 0;
    left: 0;
    z-index: -2;
    overflow: hidden;
  }
  /* &::before {
    width: 100%;
    height: 100vh;
    content: "";
    background: url("/backgroundImage/grassNav.jpg");
    opacity: ${(props) => (props.scrollState ? `${props.scrollState / 300}` : 0.01)};
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    overflow: hidden;
    filter: brightness(70%);
  } */
  /* opacity:0.3; */
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  overflow: hidden;
  padding-left: 100px;

  @media screen and (max-width: 768px) {
    height: 70px;
  }

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const Logo = styled.div`
  width: 140px;
  height: 140px;
  font-size: 30px;
  margin-top: 10px;
  margin-left: -5px;
  font-weight: bold;
  color:black;

  @media screen and (max-width: 1024px) {
    margin-top: 6px;
    width: 84px;
    height: 84px;
  }
`;

const UlContainer = styled.ul`
  display: flex;
  width: 100%;
  justify-content: space-between;
  font-size: 26px;
  font-weight: bold;
  margin: 0;
  padding: 0;
  list-style: none;
  margin-top: 80px;
  padding-left: 16rem;
  padding-right: 20px;
`;

const LiItem = styled.li`
  &:hover {
    border-top: 2px solid orange;
    padding-top:2px;
  }
  margin-right: 18px;
  &:nth-child(1){
    color: black;

  }
  &:nth-child(2) {
    color: black;
  }

  &:nth-child(3) {
    color:rgb(102,26,0,1);
  }
`;

const SearchBox = styled.li`
  display: flex;
  color: rgba(55, 49, 49, 0.14);
  align-items: center;
  justify-content: space-between;

  width: 310px;
  height: 32px;
  margin-top: -4px;
  padding-right: 4px;
`;

const SearchBoxInput = styled.input`
  width: 300px;
  height: 28px;
  border: none;
  border-radius: 10px;
  padding-left:6px;

  &:focus {
    outline: 2px solid orange;
  }
`;

const SearchBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  width: 60px;
  height: 28px;
  background: gray;
  border-radius: 10px;
  color: white;

  &:hover{
    background-color: #ffa600f4;
  }
`;

const MyPageToolBox = styled.div`
  display: flex;
  margin-left: auto;
  width: 10%;
  height: auto;
  margin-top: -5px;
  @media screen and (max-width: 1024px) {
    margin-left: 0;
    margin-top: 34px;
    width: 33px;
    height: 33px;
  }
`;

const MobileNavContainer = styled.div.attrs(() => {})`
  display: none;
  width: 100%;
  height: 80px;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  overflow: hidden;
  padding-left: 20px;
  padding-right: 20px;
  background-color: ${(props) =>
      props.scrollState ? `rgb(181, 214, 146, ${props.scrollState / 100})` : "none"};

  @media screen and (max-width: 1024px) {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
`;

const MobileMenu = styled.div`
  width: 30px;
  height: 30px;
  margin-top: 100px;
  @media screen and (max-width: 1024px) {
    width: 25px;
    height: 25px;
    margin-left: 77px;
    margin-top: 44px;
  }
  @media screen and (max-width: 768px) {
    margin-left: -4px;
  }
`;
