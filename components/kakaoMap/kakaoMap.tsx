import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import useScrollFadeIn from "../../hooks/useScrollFadein";
import locationCategoryItem from "../locationCategory/serviceCategoryItem";
import { kakaoMapState, locationState } from "../../state/store";
import CityLocationCategoryItem from "../locationCategory/cityLocationCategoryItem";
import ServiceCategoryItem from "../locationCategory/serviceCategoryItem";
import Loading from "../common/loading";
import { location, cityLocation } from "../../public/mockData";
import { SearchBtn } from "../../styles/globalStyle"

declare global {
  interface Window {
    kakao: any;
  }
}
const kakaoMap = () => {
  const regionState = locationState((state) => state.region);
  const cityState = locationState((state) => state.city);
  const idxState = locationState((state) => state.idx);
  const serviceState = locationState((state) => state.service);
  const markers = kakaoMapState((state) => state.markers);
  const setMarkers = kakaoMapState((state) => state.setMarkers);
  const resetMarkers = kakaoMapState((state) => state.resetMarkers);

  const [loading, setLoading] = useState<boolean>(false);

  const mapRef = useRef<HTMLDivElement | null>(null);


  const [map, setMap] = useState<any>();
  let infoWindow: any;
  let ps: any;
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
    } else {
      keyword = regionState + cityState + serviceState;
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
    console.log("리무스 마커 함수 작동");
    let copyMarkers = [...markers];
    for (let i = 0; i < markers.length; i++) {
      console.log(markers[i], "마커 i번째");
      copyMarkers[i].setMap(null);
    }
    resetMarkers();
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
    setMarkers(marker);

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
  function displayInfowindow(marker: any, title: any) {
    var content = '<div style="padding:5px;z-index:1;">' + title + "</div>";

    infoWindow.setContent(content);
    infoWindow.open(map, marker);
  }

  // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다

  const displayPlaces = (places: any) => {
    var listEl = document.getElementById("placesList"),
      menuEl = document.getElementById("menu_wrap"),
      fragment = document.createDocumentFragment(),
      bounds = new window.kakao.maps.LatLngBounds(),
      listStr = "";

    // 검색 결과 목록에 추가된 항목들을 제거합니다
    removeMarker();

    removeAllChildNods(listEl);

    // 지도에 표시되고 있는 마커를 제거합니다

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
    if (menuEl !== null) {
      menuEl.scrollTop = 0;
    }

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    console.log(map, "맵");
    map.setBounds(bounds);
  };

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
        setMap(new window.kakao.maps.Map(container, options));
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
  useEffect(() => {
    console.log(map, "맵이다맵");
  }, [map]);

  useEffect(() => {
    console.log(markers, "마커스");
  }, [markers]);
  return (
    <>
      <ThirdSectionSearchBtn onClick={searchBtnClick}>
        검색
      </ThirdSectionSearchBtn>

      <MapWrap className="map_wrap" ref={mapRef}>
        <Map id="map">
          <MapMenuWrap id="menu_wrap" className="bg_white">
            <div className="option"></div>
            <PlaceList id="placesList"></PlaceList>
            <PageNation id="pagination"></PageNation>
          </MapMenuWrap>
        </Map>
      </MapWrap>
    </>
  );
};
export default kakaoMap;


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
  font-size: 2rem;
  font-family: "Malgun Gothic";
  position: relative;
`;
const MapWrap = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  font-size: 3rem;
`;

const PlaceList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  padding-left: 10px;
  padding-right: 20px;
`;

const PlaceListItem = styled.li``;
const MapMenuWrap = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 18px;
  padding: 0;
  margin-left: 10px;
  margin-top: 10px;
  padding-bottom: 10px;
  width: 250px;
  height: 90%;
  overflow: scroll;
  z-index: 1000;
  @media screen and (max-width: 768px) {
    width: 200px;
  }
`;

const PageNation = styled.div`
  display: flex;
  justify-content: space-around;
`;
