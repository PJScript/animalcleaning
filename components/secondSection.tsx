import styled from "styled-components";
import { SectionDiv } from "./globalSection";
import Image from "next/image";
import { useEffect, useState, useRef} from "react";
import useScrollFadeIn from '../hooks/useScrollFadein';

const SecondSection = () => {
  const categoryItemLeftAnimation01 = useScrollFadeIn("left", 0.5, 0.1)
  const categoryItemLeftAnimation02 = useScrollFadeIn("left", 0.5, 0.2)
  const categoryItemLeftAnimation03 = useScrollFadeIn("left", 0.5, 0.3)
  const categoryItemLeftAnimation04 = useScrollFadeIn("left", 0.5, 0.4)
  const categoryItemLeftAnimation05 = useScrollFadeIn("left", 0.5, 0.5)
  const suddenRankCategory = useScrollFadeIn("up", 0.5,0)

  const [resize, setResize] = useState<number>(1024)
    useEffect(()=>{
      window.addEventListener("resize",()=>{
        if(window.innerWidth < 1024){
          setResize(window.innerWidth)
        }
        return window.removeEventListener("resize",()=>{

        })
      })
    },[])
    return (
    <>
      <SectionWrapper >
        <ListContainerWrapper>
          <ListTitle01>인기 서비스</ListTitle01>
          <ListCategoryUl resize={resize}>
          <ListCategoryItem className="hover" {...categoryItemLeftAnimation01}>
              <Image
                src={"/thumbnails/agilityThumbnail.png"}
                width={200}
                height={150}
              ></Image>
              <CategoryItemTitle>대회</CategoryItemTitle>
              <CategoryItemSubTitle>120명이 서비스를 이용했어요!</CategoryItemSubTitle>
            </ListCategoryItem>
            <ListCategoryItem className="hover" {...categoryItemLeftAnimation02}>
              <Image
                src={"/thumbnails/eduThumbnail.png"}
                width={200}
                height={150}
              ></Image>
              <CategoryItemTitle>교육</CategoryItemTitle>
              <CategoryItemSubTitle>120명이 서비스를 이용했어요!</CategoryItemSubTitle>
            </ListCategoryItem>

            <ListCategoryItem className="hover" {...categoryItemLeftAnimation03}>
              <Image
                src={"/thumbnails/groomingThumbnail.png"}
                width={200}
                height={150}
              ></Image>
              <CategoryItemTitle>미용</CategoryItemTitle>
              <CategoryItemSubTitle>241명이 서비스를 이용했어요!</CategoryItemSubTitle>

            </ListCategoryItem>

            <ListCategoryItem className="hover" {...categoryItemLeftAnimation04}>
              <Image
                src={"/thumbnails/duckThumbnail.png"}
                width={200}
                height={150}
              ></Image>
              <CategoryItemTitle>목욕</CategoryItemTitle>
              <CategoryItemSubTitle>15명이 서비스를 이용했어요!</CategoryItemSubTitle>

            </ListCategoryItem>

            <ListCategoryItem className="hover" {...categoryItemLeftAnimation05}>
              <Image
                src={"/thumbnails/bathThumbnail.png"}
                width={200}
                height={150}
              ></Image>
              <CategoryItemTitle>출장 목욕</CategoryItemTitle>
              <CategoryItemSubTitle>528명이 서비스를 이용했어요!</CategoryItemSubTitle>

            </ListCategoryItem>
          </ListCategoryUl>
        </ListContainerWrapper>
        <ListContainerWrapper>
          <ListTitle01>급상승 서비스</ListTitle01>
          <ListCategoryUl {...suddenRankCategory}>
            <BlankCategoryItem className="hover">
              <Image
                src={"/backgroundImage/nosearch.png"}
                width={100}
                height={100}
              ></Image>
              <div>아직 데이터가 부족해요..!</div>
            </BlankCategoryItem>

            {/* <ListCategoryItem>아이템1</ListCategoryItem>
            <ListCategoryItem>아이템2</ListCategoryItem>
            <ListCategoryItem>아이템3</ListCategoryItem>
            <ListCategoryItem>아이템4</ListCategoryItem> */}
          </ListCategoryUl>
        </ListContainerWrapper>
      </SectionWrapper>
    </>
  );
};

export default SecondSection;

const SectionWrapper = styled(SectionDiv)`

  height:auto;
  color: black;
  font-size: 5.6rem;
  padding-left: 6rem;
  padding-right: 6rem;

  @media screen and(max-width:982px){
    padding-left:0rem;
    padding-right:0rem;
    width:100%;
  }
`;

const ListContainerWrapper = styled.div`
  display:flex;
  flex-direction: column;
  justify-content:center;
  width: 100%;
  margin-top:30px;
  @media screen and (max-width:1024px){
    align-items: center;
    
  }


`;

const ListTitle01 = styled.div`
  font-size: 4.6rem;
  @media screen and (max-width:940px){
    text-align:center;
}
`;

const ListCategoryUl = styled.ul.attrs(()=>{})`
  display: flex;
  width: 100%;
  height:auto;
  justify-content: space-around;
  list-style: none;
  padding: 0;
  margin: 0;
  
  @media screen and (max-width:1024px){
    width:845px;
    flex-wrap:wrap;
    justify-content: flex-start;
  }

  @media screen and (max-width:940px) {
    width:625px;

  }
  @media screen and (max-width:768px) {
    /* width:100%; */
    width:413px;
  }

  @media screen and (max-width:430px) {
    width:278px;
  }
  /* @media screen and (max-width:516px){
    width:100%;
    padding-left:51px;
  }  */
`;

const ListCategoryItem = styled.li`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: auto;
  height: 24.7rem;
  border:1px solid black;
  border-radius: 15px;
  margin-right:1%;
  margin-top:2%;
  &:hover{
    border:1px solid orange;
    transform:translate(0px,1%)
  }

  @media screen and (max-width:430px) {
    width:17.0rem;
    height:17.0rem;
  }
`;

const CategoryItemTitle = styled.div`
  font-size:3.0rem;
`

const CategoryItemSubTitle = styled.div`
  font-size:2.0rem;
  color:gray;
`

const BlankCategoryItem = styled(ListCategoryItem)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 4.6rem;
`;
