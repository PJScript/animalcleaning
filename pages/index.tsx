import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import SecondSection from "../components/secondSection";
import ThirdSection from "../components/thirdSection";

// import scrollTo from "../utils/scrollTo";

const Home: NextPage = () => {
  DogBackImage.defaultProps = {
    src: "backgroundImage/dogBackgroundRemoveB.png",
  };

  const firstRef = useRef(null);
  const secondRef = useRef(null);
  const thirdRef = useRef(null);
  const refArray = [firstRef, secondRef, thirdRef];
  const [sectionLocation, setSectionLocation] = useState<number>(0);
  const [scrollState, setScrollState] = useState<number>(200);

  

  useEffect(() => {
   window.addEventListener("scroll",()=>{
    //  console.log(window.scrollY,"스크롤")
    if(window.scrollY <= 100){
      setScrollState(100 - window.scrollY)
      return removeEventListener("scroll",()=>{

      })
    }else if(window.scrollY > 101 && window.scrollY <= 1000){
      setScrollState(0)
    }
   })
  }, []);
  return (
    <>
      <MainDiv>
        <MainContainer ref={firstRef}>
          <Figure>
            <DogBackImage scrollState={scrollState}></DogBackImage>
          </Figure>
          <MainLeftTopBox>
            <Title01></Title01>
            <Title01></Title01>
            <Title01>
              반려동물 서비스의 모든 것<br></br>
              팔자좋은 개 에서 시작하세요
              <br></br>
              <SecretMsg>이건 비밀인데 옆집 바둑이는 벌써 사용중이래요!</SecretMsg>
              <MainLeftButtonBox>
                <DefaultBtn className="hover">고객님 공간</DefaultBtn>
                <DefaultBtn className="hover">사장님 공간</DefaultBtn>
              </MainLeftButtonBox>
            </Title01>
            <Title01></Title01>
          </MainLeftTopBox>

          <MainCenterCategoryWrapper>
            <MainCenterCategoryBox>
              <CategoryLeftInner>
                <MainCenterCategoryItem>
                  <CategoryItemIcon>
                    <Image
                      className="hover"
                      src={"/icon/iconBath.png"}
                      width={100}
                      height={100}
                    ></Image>
                  </CategoryItemIcon>
                  <CategoryItemTitle className="hover">
                    출장 목욕
                  </CategoryItemTitle>
                </MainCenterCategoryItem>

                <MainCenterCategoryItem>
                  <CategoryItemIcon>
                    <Image
                      className="hover"
                      src={"/icon/iconDuck.png"}
                      width={100}
                      height={100}
                    ></Image>
                  </CategoryItemIcon>
                  <CategoryItemTitle className="hover">
                    셀프 목욕
                  </CategoryItemTitle>
                </MainCenterCategoryItem>

                <MainCenterCategoryItem>
                  <CategoryItemIcon>
                    <Image
                      className="hover"
                      src={"/icon/iconGrooming.png"}
                      width={100}
                      height={100}
                    ></Image>
                  </CategoryItemIcon>
                  <CategoryItemTitle className="hover">
                    애견 미용
                  </CategoryItemTitle>
                </MainCenterCategoryItem>

                <MainCenterCategoryItem>
                  <CategoryItemIcon>
                    <Image
                      className="hover"
                      src={"/icon/iconEducation.png"}
                      width={100}
                      height={100}
                    ></Image>
                  </CategoryItemIcon>
                  <CategoryItemTitle className="hover">
                    전문 교육
                  </CategoryItemTitle>
                </MainCenterCategoryItem>
              </CategoryLeftInner>
              <CategoryRightInner>
                <CategoryMoreBox>
                  <CategoryMoreBoxItem>
                    <MoreBoxTitle>새로운 분야를 건의 해주세요!</MoreBoxTitle>
                    <SuggestBtn className="hover">건의하기</SuggestBtn>
                  </CategoryMoreBoxItem>
                </CategoryMoreBox>
              </CategoryRightInner>
            </MainCenterCategoryBox>
          </MainCenterCategoryWrapper>
          <FooterIconBox>
            <Image
              className="hover"
              src={"/icon/kakao.png"}
              width={30}
              height={30}
            ></Image>
            <Image
              className="hover"
              src={"/icon/instagram.png"}
              width={30}
              height={30}
            ></Image>
            <Image
              className="hover"
              src={"/icon/youtube.png"}
              width={30}
              height={30}
            ></Image>
          </FooterIconBox>
        </MainContainer>
        <SecondSection></SecondSection>
        <ThirdSection></ThirdSection>
      </MainDiv>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </>
  );
};

export default Home;

const MainDiv = styled.div`
  width: 100%;
  height: auto;

  &::after {
    position: absolute;
    width: 100%;
    height: 300vh;
    top: 0;
    left: 0;
    background: rgb(181, 214, 146);
    background: linear-gradient(
      180deg,
      rgba(181, 214, 146, 1) 0%,
      rgba(255, 255, 255, 1) 100%
    );
    z-index: -2;
    content: "";
    /* filter: brightness(70%); */
  }
`;

const MainContainer = styled.div.attrs(() => {})`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  width: 100%;
  height: 100vh;
  padding-left: 98px;
  padding-right: 98px;

  @media screen and (max-width: 768px) {
    padding-left: 20px;
    padding-right: 20px;
  }
  /* &::after {
    width: 100%;
    height: 100vh;
    content: "";
    filter: brightness(70%);

    position: absolute;
    top: 0;
    left: 0;
    z-index: -2;
    overflow: hidden;
  } */

  &::before {
    width: 100%;
    height: 100vh;
    content: "";
    background: url("/backgroundImage/grass.jpg");
    background-size: cover;
    opacity: 0;

    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    overflow: hidden;
    /* filter: brightness(70%); */
  }
`;

const MainLeftTopBox = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    height: 50vh;
  }
`;

const Title01 = styled.div`
  font-size: 5.2rem;
  color:black;
`;

const SecretMsg = styled.div`
  font-size:2.6rem;
  color:gray;
`

const MainLeftButtonBox = styled.div`
  display: flex;
  max-width: 400px;
  height: 50px;
`;

const DefaultBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 152px;
  height: 100%;
  max-height: 54px;
  background-color: rgba(0, 0, 0, 0.75);
  border-radius: 15px;
  font-size: 30px;
  font-weight: bold;
  margin-top: 39px;
  color:white;

  &:hover {
    background-color: #ffa600f4;
  }

  &:nth-child(1) {
    margin-right: 27px;
  }
`;

const MainCenterCategoryWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 140px;
  justify-content: center;
  align-items: center;
`;

const MainCenterCategoryBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 33px;
  padding-right: 33px;
  width: 941px;
  max-height: 131px;
  height: calc(67vw - 1.34rem);

  background-color: rgba(254, 254, 254, 0.66);
  border-radius: 10px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    max-height: 200px;
    padding-top: 22px;
  }
`;

const CategoryLeftInner = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
const CategoryRightInner = styled.div``;

const MainCenterCategoryItem = styled.div`
  width: 70px;
  max-width: 70px;
  height: 90px;
`;

const CategoryMoreBox = styled.div`
  width: 440px;
  height: 90px;

  @media screen and (max-width: 982px) {
    width: 110%;
  }
`;

const CategoryMoreBoxItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  @media screen and (max-width: 982px) {
    width: 100%;
    height: auto;
  }
`;

const MoreBoxTitle = styled.div`
  font-size: 2.6rem;
  color: rgb(153, 154, 154);
  margin-bottom: 11px;
`;

const SuggestBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 32px;
  font-size: 26px;
  font-weight: bold;
  background-color: rgba(21, 23, 23, 0.81);
  border-radius: 10px;

  &:hover {
    background-color: #ffa600f4;
  }
`;

const CategoryItemIcon = styled.div`
  width: 66px;
  height: 66px;
  &:hover {
    margin-top: 8px;
  }

  @media screen and (max-width: 480px) {
    width: 48px;
    height: 48px;
  }
`;

const CategoryItemTitle = styled.div`
  font-size: 2.6rem;
  color: black;
  font-weight: bold;
  /* @media screen and (max-width: 480px) {
    font-size: 2.6rem;
  } */
`;

const Figure = styled.div`
  position: absolute;
  z-index: -1;
  bottom: 0%;
  /* filter: brightness(80%); */
`;

const DogBackImage = styled.img.attrs(()=>{})`
  width: 100%;
  height: auto;
  opacity: ${(props) => (props.scrollState * 0.01)};
  object-fit: contain;
  margin-bottom: -3.2px;

  /* &::after{
    width:100%;
    height:100vh;
    content:"";
    background-size: cover;
    opacity: 0.5;
    position: absolute;
    top:0;
    left:0;
    z-index:-1;
    overflow:hidden;
    } */
`;

const FooterIconBox = styled.div`
  width: 100%;
  height: auto;
  padding-top: 20px;
  padding-bottom: 20px;
`;

//title01 의 형제 요소중 첫번째를 미디어태그 max-width 768px 에 display:none; 으로 하나 없앤다
