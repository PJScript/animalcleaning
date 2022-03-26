import styled from "styled-components";
import { SectionDiv } from "./globalSection";
import { useEffect, useRef, useState } from "react";
import { SearchBoxInput } from "./nav";
import { SearchBtn } from "../styles/globalStyle";
import useScrollFadeIn from "../hooks/useScrollFadein";
import LocationCategoryItem from "./locationCategory/locationCategoryItem";
import { locationState } from "../state/store";
import CityLocationCategoryItem from "./locationCategory/cityLocationCategoryItem";
import ServiceCategoryItem from "./locationCategory/serviceCategoryItem";
import Loading from "./common/loading";
import { location, cityLocation } from "../public/mockData";

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

  const [loading, setLoading] = useState<boolean>(false);

  const mapRef = useRef<HTMLDivElement | null>(null);

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
  
  const [map, setMap] = useState<any>()
  let infoWindow: any;
  let ps: any;
  var markers: [] = [];

  const placesSearchCB = (data: any, status: any, pagination: any) => {
    if (status === window.kakao.maps.services.Status.OK) {
      // 정상적으로 검색이 완료됐으면
      // 검색 목록과 마커를 표출합니다
      displayPlaces(data);

      // 페이지 번호를 표출합니다
      displayPagination(pagination);
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      alert("검색 결과가 존재하지 않습니다.");
      return;
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      alert("검색 결과 중 오류가 발생했습니다.");
      return;
    }
  };

  const searchPlaces = () => {
    // starter
    let keyword: string;
    ps = new window.kakao.maps.services.Places();
    infoWindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

    if (regionState === "전국") {
      keyword = serviceState;
      ps.keywordSearch(keyword, placesSearchCB);
    } else if (cityState === "전체") {
      keyword = regionState + serviceState;
      ps.keywordSearch(keyword, placesSearchCB);
    }else{
      keyword = regionState + cityState +serviceState;
      ps.keywordSearch(keyword, placesSearchCB);
    }

    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
  };


  const removeAllChildNods = (el: any) => {
    while (el.hasChildNodes()) {
      el.removeChild(el.lastChild);
    }
  };
  const removeMarker = () => {
    for (let i = 0; i < markers.length; i++) {
      markers[i]?.setMap(null);
    }
    markers = [];
  };

  const addMarker = (position: any, idx: any, title?: any) => {
    var imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
      imageSize = new window.kakao.maps.Size(36, 37), // 마커 이미지의 크기
      imgOptions = {
        spriteSize: new window.kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
        spriteOrigin: new window.kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
        offset: new window.kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
      },
      markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imgOptions
      );
    let marker: any = new window.kakao.maps.Marker({
      position: position, // 마커의 위치
      image: markerImage,
    });

    marker.setMap(map); // 지도 위에 마커를 표출합니다
    markers?.push(marker); // 배열에 생성된 마커를 추가합니다

    return marker;
  };

  function getListItem(index: any, places: any) {
    var el = document.createElement("li"),
      itemStr =
        '<span class="markerbg marker_' +
        (index + 1) +
        '"></span>' +
        '<div class="info">' +
        "   <h5>" +
        places.place_name +
        "</h5>";

    if (places.road_address_name) {
      itemStr +=
        "    <span>" +
        places.road_address_name +
        "</span>" +
        '   <span class="jibun gray">' +
        places.address_name +
        "</span>";
    } else {
      itemStr += "    <span>" + places.address_name + "</span>";
    }

    itemStr += '  <span class="tel">' + places.phone + "</span>" + "</div>";

    el.innerHTML = itemStr;
    el.className = "item";


    /////
    // let item = PlaceListItem

    return el;
  }

  function displayPagination(pagination: any) {
    var paginationEl: any = document.getElementById("pagination"),
      fragment = document.createDocumentFragment(),
      i;

    // 기존에 추가된 페이지번호를 삭제합니다
    while (paginationEl.hasChildNodes()) {
      paginationEl.removeChild(paginationEl.lastChild);
    }

    for (i = 1; i <= pagination.last; i++) {
      var el: any = document.createElement("a");
      el.innerHTML = i;

      if (i === pagination.current) {
        el.className = "on";
        
        
      } else {
        el.onclick = (function (i) {
          return function () {
            pagination.gotoPage(i);
          };
        })(i);
      }

      fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
  }
  function displayInfowindow(marker:any, title:any) {
    var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

    infoWindow.setContent(content);
    infoWindow.open(map, marker);
}

  // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다

  const searchBtnClick = () => {
    if (cityState === "") {
      alert("세부 지역을 선택 해주세요");
    } else if (serviceState === "") {
      alert("이용할 서비스를 선택 해주세요");
    } else {
      searchPlaces();
      mapRef.current?.scrollIntoView({ behavior: "smooth" });
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };
  const displayPlaces = (places: any) => {
    var listEl = document.getElementById("placesList"),
      menuEl = document.getElementById("menu_wrap"),
      fragment = document.createDocumentFragment(),
      bounds = new window.kakao.maps.LatLngBounds(),
      listStr = "";

    // 검색 결과 목록에 추가된 항목들을 제거합니다
    removeAllChildNods(listEl);

    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker();

    for (var i = 0; i < places.length; i++) {
      // 마커를 생성하고 지도에 표시합니다
      var placePosition = new window.kakao.maps.LatLng(
          places[i].y,
          places[i].x
        ),
        marker = addMarker(placePosition, i),
        itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
      // LatLngBounds 객체에 좌표를 추가합니다
      bounds.extend(placePosition);

      // 마커와 검색결과 항목에 mouseover 했을때
      // 해당 장소에 인포윈도우에 장소명을 표시합니다
      // mouseout 했을 때는 인포윈도우를 닫습니다
      (function (marker, title) {
        window.kakao.maps.event.addListener(marker, "mouseover", function () {
          displayInfowindow(marker, title);
        });

        window.kakao.maps.event.addListener(marker, "mouseout", function () {
          infoWindow.close();
        });

        itemEl.onmouseover = function () {
          displayInfowindow(marker, title);
        };

        itemEl.onmouseout = function () {
          infoWindow.close();
        };
      })(marker, places[i].place_name);

      fragment.appendChild(itemEl);
    }

    // 검색결과 항목들을 검색결과 목록 Element에 추가합니다

    listEl?.appendChild(fragment);
    if(menuEl !== null){
      menuEl.scrollTop = 0;
    }

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    console.log(map,"맵")
    map.setBounds(bounds);
  };

  useEffect(() => {
    const mapScript = document.createElement("script");

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&libraries=services&autoload=false`;

    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        };
        setMap(new window.kakao.maps.Map(container, options)) 
        const markerPosition = new window.kakao.maps.LatLng(
          33.450701,
          126.570667
        );
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        marker.setMap(map);
      });
    };
    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => mapScript.removeEventListener("load", onLoadKakaoMap);
  }, []);
  useEffect(()=>{
    console.log(map,"맵이다맵")
  },[map])
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
        <ThirdSectionSearchBtn onClick={searchBtnClick}>
          검색
        </ThirdSectionSearchBtn>
        <MapWrap className="map_wrap" ref={mapRef}>
          <Map id="map" >
          <MapMenuWrap id="menu_wrap" className="bg_white">
            <div className="option"></div>
            <PlaceList id="placesList"></PlaceList>
            <PageNation id="pagination"></PageNation>
          </MapMenuWrap>
          </Map>


        </MapWrap>
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

const ThirdSectionSearchBtn = styled(SearchBtn)`
  width: 100%;
  max-width: 360px;
  height: 60px;
  font-size: 3.6rem;
  margin-top: 40px;
  margin-bottom: 40px;
`;

const Map = styled.div`
  width: 80vw;
  height: 60vh;
  font-size:2.0rem;
  font-family:'Malgun Gothic';
  position:relative;
`;
const MapWrap = styled.div`
  padding-top:20px;
  padding-bottom:20px;
  font-size:3.0rem;
`

const PlaceList = styled.ul`
  list-style:none;
  margin:0;
  padding:0;
  padding-left:10px;
  padding-right:20px;
`

const PlaceListItem = styled.li`

`
const MapMenuWrap = styled.div`
  position:absolute;
  background:rgba(255, 255, 255, 0.7);
  border-radius: 18px;
  padding:0;
  margin-left:10px;
  margin-top:10px;
  padding-bottom:10px;
  width:30%;
  height:90%;
  overflow:scroll;
  z-index:1000;
`

const PageNation = styled.div`
  display:flex;
  justify-content: space-around;


`




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
