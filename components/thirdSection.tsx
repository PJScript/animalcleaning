import styled from "styled-components";
import { SectionDiv } from "./globalSection";
import { useEffect, useRef, useState } from "react";
import { SearchBoxInput } from "./nav";
import { SearchBtn } from "../styles/globalStyle";
import useScrollFadeIn from "../hooks/useScrollFadein";
import LocationCategoryItem from "./locationCategory/locationCategoryItem";
import { kakaoMapState, locationState } from "../state/store";
import CityLocationCategoryItem from "./locationCategory/cityLocationCategoryItem";
import ServiceCategoryItem from "./locationCategory/serviceCategoryItem";
import Loading from "./common/loading";
import { location, cityLocation } from "../public/mockData";
import KakaoMap from "../components/kakaoMap/kakaoMap"
declare global {
  interface Window {
    kakao: any;
  }
}

const ThirdSection = () => {
  const regionState = locationState((state) => state.region);
  const cityState = locationState((state) => state.city);
  const idxState = locationState((state) => state.idx);
  const serviceState = locationState((state) => state.service);
  const markers = kakaoMapState((state) => state.markers)
  const setMarkers = kakaoMapState((state) => state.setMarkers)
  const resetMarkers = kakaoMapState((state) => state.resetMarkers)

  const [loading, setLoading] = useState<boolean>(false);

  const mapRef = useRef<HTMLDivElement | null>(null);


  return (
    <>
      <Loading view={loading}></Loading>
      <ThirdSectionWrapper>
        <ThirdTitle>내 주변 찾아보기</ThirdTitle>
        <div>
          {regionState} {">"}
          {cityState}
        </div>
        <LocationCategoryUl>
          {[
            "서울",
            "경기",
            "강원",
            "충북",
            "충남",
            "전북",
            "전남",
            "경북",
            "경남",
            "제주",
          ].map((item, idx) => {
            return (
              <LocationCategoryItem
                key={idx}
                idx={idx}
                locationName={item}
              ></LocationCategoryItem>
            );
          })}
        </LocationCategoryUl>
        <CityLocationCategoryList>
          {regionState ? (
            cityLocation[idxState].map((item, idx) => {
              return (
                <CityLocationCategoryItem
                  key={idx}
                  locationCityName={item}
                ></CityLocationCategoryItem>
              );
            })
          ) : (
            <div>먼저 지역을 선택 해주세요!</div>
          )}
        </CityLocationCategoryList>
        {cityState ? (
          <ServiceCategoryList>
            <ServiceCategoryItem serviceName="애견미용"></ServiceCategoryItem>
            <ServiceCategoryItem serviceName="셀프목욕"></ServiceCategoryItem>
            <ServiceCategoryItem serviceName="출장목욕"></ServiceCategoryItem>
            <ServiceCategoryItem serviceName="애견훈련"></ServiceCategoryItem>
            <ServiceCategoryItem serviceName="기타"></ServiceCategoryItem>
          </ServiceCategoryList>
        ) : regionState ? (
          <div>세부 지역을 선택해주세요!</div>
        ) : null}
<KakaoMap />
      </ThirdSectionWrapper>
    </>
  );
};

export default ThirdSection;

const ThirdSectionWrapper = styled(SectionDiv)`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 5.6rem;
  padding-left: 98px;
  padding-right: 98px;
  margin-top: 5.5rem;
  width: 100%;
  height: auto;
  @media screen and (max-width: 768px) {
    padding-left: 10px;
    padding-right: 10px;
  }
`;

const ThirdTitle = styled.div`
  margin-top: 20px;
`;








const LocationCategoryUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  height: auto;
  list-style: none;
  margin: 0;
  padding: 0;
  @media screen and (max-width: 768px) {
    width: 400px;
    justify-content: flex-start;
  }
  @media screen and (max-width: 480px) {
    width: 280px;
  }
`;

const CityLocationCategoryList = styled.ul`
  display: flex;
  width: 768px;
  background-color: rgba(69, 69, 71, 0.3);
  border-radius: 18px;
  flex-wrap: wrap;
  margin: 0px;
  padding: 0px;
  padding: 20px;
  list-style: none;
  font-size: 3.4rem;
  margin-top: 20px;

  @media screen and (max-width: 1024px) {
    width: 640px;
  }
  @media screen and (max-width: 768px) {
    width: 440px;
  }
  @media screen and (max-width: 480px) {
    width: 270px;
  }
`;

const ServiceCategoryList = styled.ul`
  display: flex;
  list-style: none;
  width: 768px;
  @media screen and (max-width: 1024px) {
    width: 640px;
  }
  @media screen and (max-width: 768px) {
    width: 440px;
  }
  @media screen and (max-width: 480px) {
    width: 270px;
  }
  border-radius: 18px;
  flex-wrap: wrap;
  margin: 0px;
  padding: 0px;
  padding: 20px;
  height: auto;
  padding: 20px;
  background: gray;
  margin-top: 20px;
`;
