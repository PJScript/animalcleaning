import styled from "styled-components";
import { SectionDiv } from "./globalSection";
import { useEffect, useRef, useState } from "react";
import { SearchBoxInput } from "./nav";
import { SearchBtn } from "../styles/globalStyle";
import useScrollFadeIn from "../hooks/useScrollFadein";
import LocationCategoryItem from "./locationCategory/locationCategoryItem";
import { locationState } from "../state/store";
import CityLocationCategoryItem from "./locationCategory/cityLocationCategoryItem"
import Loading from "./common/loading"
declare global {
  interface Window {
    kakao: any;
  }
}

const ThirdSection = () => {
  const regionState = locationState((state) => state.region);
  const cityState = locationState((state) => state.city);
  const idxState = locationState((state) => state.idx);
  
  const [loading, setLoading] = useState<boolean>(false)

  const mapRef = useRef<HTMLDivElement | null>(null)
  let location = [
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
  ];
  let cityLocation = [
    [
      "강남구",
      "강동구",
      "강서구",
      "관악구",
      "광진구",
      "구로구",
      "금천구",
      "노원구",
      "도봉구",
      "동대문구",
      "동작구",
      "마포구",
      "서대문구",
      "서초구",
      "성동구",
      "성북구",
      "송파구",
      "양천구",
      "영등포구",
      "용산구",
      "은평구",
      "종로구",
      "중구",
      "중랑구",
    ],
    ["강남구", "강동구"],
    ["강서구", "관악구"],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ];

  const locationItemLeftAnimation02 = useScrollFadeIn("left", 0.5, 0.15);
  const locationItemLeftAnimation03 = useScrollFadeIn("left", 0.5, 0.2);
  const locationItemLeftAnimation04 = useScrollFadeIn("left", 0.5, 0.25);
  const locationItemLeftAnimation05 = useScrollFadeIn("left", 0.5, 0.3);
  const locationItemLeftAnimation06 = useScrollFadeIn("left", 0.5, 0.35);
  const locationItemLeftAnimation07 = useScrollFadeIn("left", 0.5, 0.4);
  const locationItemLeftAnimation08 = useScrollFadeIn("left", 0.5, 0.45);
  const locationItemLeftAnimation09 = useScrollFadeIn("left", 0.5, 0.5);
  const locationItemLeftAnimation10 = useScrollFadeIn("left", 0.5, 0.55);
  const locationItemLeftAnimation11 = useScrollFadeIn("left", 0.5, 0.6);
  const locationItemLeftAnimation12 = useScrollFadeIn("left", 0.5, 0.65);
  const locationItemLeftAnimation13 = useScrollFadeIn("left", 0.5, 0.7);
  const locationItemLeftAnimation14 = useScrollFadeIn("left", 0.5, 0.75);
  const locationItemLeftAnimation15 = useScrollFadeIn("left", 0.5, 0.8);
  const locationItemLeftAnimation16 = useScrollFadeIn("left", 0.5, 0.85);
  const locationItemLeftAnimation17 = useScrollFadeIn("left", 0.5, 0.9);

  let map: any;
  let infoWindow: any;
  const displayMarker = (place: any) => {
    // 마커를 생성하고 지도에 표시합니다
    var marker = new window.kakao.maps.Marker({
      map: map,
      position: new window.kakao.maps.LatLng(place.y, place.x),
    });

    // 마커에 클릭이벤트를 등록합니다
    window.kakao.maps.event.addListener(marker, "click", function () {
      // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
      infoWindow.setContent(
        '<div style="padding:5px;font-size:12px;">' +
          place.place_name +
          "</div>"
      );
      infoWindow.open(map, marker);
    });
  };
  const placesSearchCB = (data: any, status: any, pagination: any) => {
    if (status === window.kakao.maps.services.Status.OK) {
      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
      // LatLngBounds 객체에 좌표를 추가합니다
      var bounds = new window.kakao.maps.LatLngBounds();

      for (var i = 0; i < data.length; i++) {
        displayMarker(data[i]);
        bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
      }

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      map.setBounds(bounds);
    }
  };
  const initMap = () => {
    infoWindow = new window.kakao.maps.InfoWindow({ zIndex: 1 }); // 마커를 클릭시 장소를 띄울 인포윈도우
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    map = new window.kakao.maps.Map(container, options);
    const ps = new window.kakao.maps.services.Places(); // 검색 서비스 객체 생성
    // 마커 이미지의 이미지 주소입니다
    ps.keywordSearch("애견미용", placesSearchCB);
  };
  const mapStyle = {
    width: "80%",
    height: "600px",
  };


  const searchBtnClick = () => {
    mapRef.current?.scrollIntoView({ behavior: 'smooth' });
    setLoading(true)

    setTimeout(()=>{
  setLoading(false)
    },3000)
  }

  useEffect(() => {
    console.log(regionState, "여기");
  }, [regionState]);
  return (
    <>
     <Loading view={loading}></Loading>
      <ThirdSectionWrapper>
        <ThirdTitle>내 주변 찾아보기</ThirdTitle>
        <div>
          {regionState} {">"}{cityState}
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
          {cityLocation[idxState].map((item, idx) => {
            return (
              
                <CityLocationCategoryItem key={idx} locationCityName={item}></CityLocationCategoryItem>
            );
          })}
              </CityLocationCategoryList>
        <ThirdSectionSearchBtn onClick={searchBtnClick}>검색</ThirdSectionSearchBtn>

        <SearchBarWrapper>
          <SearchBar placeholder="어떤 서비스를 찾으시나요?"></SearchBar>
        </SearchBarWrapper>
        <Map id="map" ref={mapRef}></Map>
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
    padding-left:10px;
    padding-right:10px;
  }
`;

const ThirdTitle = styled.div`
  margin-top: 20px;
`;

const ThirdSectionSearchBtn = styled(SearchBtn)`
  width: 100%;
  max-width: 360px;
  height: 60px;
  font-size: 3.6rem;
  margin-top: 40px;
`;

const Map = styled.div`
  width: 90vw;
  height: 60vh;
`;

const SearchBarWrapper = styled.div`
  width: 100%;
  height: auto;
`;

const SearchBar = styled(SearchBoxInput)`
  width: 100%;
  height: 5.6rem;
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
  width:768px;
  background-color: rgba(69, 69, 71,0.3);
  border-radius:18px;
  flex-wrap:wrap;
  margin:0px;
  padding: 0px;
  padding:20px;
  list-style: none;
  font-size:3.4rem;
  margin-top:20px;

  @media screen and (max-width:1024px) {
    width: 640px;
  }
  @media screen and (max-width:768px) {
    width: 440px;
  }
  @media screen and (max-width: 480px) {
    width: 270px;
  }
`;


