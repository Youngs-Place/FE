import React, { useEffect, useRef, useState, MutableRefObject } from 'react';
import axios from 'axios';
import './map.css';
import { CITIES, CITY_COORDINATES, COUNTY_COORDINATES } from './map/cities';

import Papa from 'papaparse';
import markerPng from './marker.png';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';

class SearchedPlace {
  location: any;
  marker: kakao.maps.Marker | null;
  infoWindow: kakao.maps.CustomOverlay | null;
  constructor(location: object, marker: kakao.maps.Marker | null = null, infoWindow: kakao.maps.CustomOverlay | null = null) {
    this.location = location;
    this.marker = marker;
    this.infoWindow = infoWindow;
  }
  createMarker(y: number, x: number): kakao.maps.Marker {
    this.marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(y, x),
    });
    return this.marker;
  }
  createInfoWindow(str: string = ''): kakao.maps.CustomOverlay {
    this.infoWindow = new kakao.maps.CustomOverlay({
      content: str,
    });
    return this.infoWindow;
  }
}
const Map: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('서울특별시');
  const [selectedDistrict, setSelectedDistrict] = useState<string>(CITIES['서울특별시'][0]);
  const [isKakaoLoaded, setIsKakaoLoaded] = useState<boolean>(false);
  const [markers, setMarkers] = useState<any[]>([]);
  const [markerClicked, setMarkerClicked] = useState<boolean>(false);
  const [mapClicked, setMapClicked] = useState<boolean>(false);
  const markerRef = useRef<any>(null);
  const mapRef = useRef<any>(null);
  const [isAllSelected, setIsAllSelected] = useState<boolean>(true);
  const [isWishlistVisible, setIsWishlistVisible] = useState<boolean>(false); // 찜 목록 표시 여부 상태 추가
  const [wishlistItems, setWishlistItems] = useState<string[]>(Array(10).fill('서울특별시 종로구 종로 56길 순위권 시티타워'));
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState<boolean>(false);
  const [isDistrictDropdownOpen, setIsDistrictDropdownOpen] = useState<boolean>(false);

  const handleRefreshPage = () => {
    window.location.reload(); // 페이지 새로고침
  };
  const [places, setPlaces] = useState<SearchedPlace[]>([]);
  const placeRef = useRef<SearchedPlace>(new SearchedPlace({complex_name: "WRONG ACCESS"}, null, null));
  const [init, setInit] = useState<boolean>(true);

  const navigate = useNavigate();





  const handleToggleAllClick = () => {
    setIsAllSelected(true);
  };

  const handleToggleProgressClick = () => {
    setIsAllSelected(false);
  };

  const handleWishlistClick = () => {
    setIsWishlistVisible(true);
  };

  const handleWishlistClose = () => {
    setIsWishlistVisible(false);
  };

  const handleRemoveWishlistItem = (index: number) => {
    setWishlistItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  // const handleDetailBack = () => {
  //   // window.location.href="./";
  //   const navigate = useNavigate();
  //   navigate('/');
  // }

  const location = useLocation();
  useEffect(() => {
    if(init) return;
    console.log(location);
    console.log('page navigated to: ', location.pathname);
    if(location.pathname == "/detail") return;


    const oldScript2 = document.querySelectorAll(`script[src*="http://t1.daumcdn.net"]`);
    const newScript2 = [];
    for(let i=0; i<oldScript2.length; i++){
      newScript2.push(oldScript2[i]?.parentNode?.removeChild(oldScript2[i]));
    }
    const oldScript = document.getElementById('callAPI');
    oldScript?.parentNode?.removeChild(oldScript);
    
    const script = document.createElement("script");
    script.id = 'callAPI';
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP}&libraries=services&autoload=false`;
    document.head.appendChild(script);
    
    for(let i=0; i<newScript2.length; i++){
      document.head.appendChild(newScript2[i]);
    }

    script.onload = () => {
      console.log(places);//-----------------------------------------------------------------------------------------------------
      const { kakao } = window as any;
      kakao.maps.load(() => {
        const container = document.getElementById("map");
        console.log(placeRef.current.marker.getPosition());
        const options = {
          center: new kakao.maps.LatLng(placeRef.current.marker.getPosition().getLat(), placeRef.current.marker.getPosition().getLng()),
          level: 4,
        };
        
        const map = new kakao.maps.Map(container, options);
        mapRef.current = map;
        setIsKakaoLoaded(true);

        // 마커 다시 그리기
        places.forEach((place)=>{
          place.marker.setMap(map);
        });
        placeRef.current.infoWindow.setMap(map);
        
        kakao.maps.event.addListener(mapRef.current, 'click', function(){
          console.log('map clicked');
          placeRef.current.infoWindow.setVisible(false);
          kakao.maps.event.removeListener(mapRef.current, 'click', function(){});
        });
      });
    };
  }, [location]);


  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP}&libraries=services&autoload=false`;
    script.id = 'callAPI';
    document.head.appendChild(script);

    script.onload = () => {
      const { kakao } = window as any;
      kakao.maps.load(() => {
        const container = document.getElementById("map");

        // 도시 또는 군에 따른 좌표 설정
        const coordinates = CITY_COORDINATES[selectedCity] || COUNTY_COORDINATES[selectedCity];

        if (coordinates) {
          const options = {
            center: new kakao.maps.LatLng(coordinates.lat, coordinates.lng),
            level: 4,
          };
          const map = new kakao.maps.Map(container, options);
          mapRef.current = map;
          setIsKakaoLoaded(true);
          setInit(false);
        } else {
          console.error('Coordinates not found for:', selectedCity);
        }
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (isKakaoLoaded) {
      const { kakao } = window as any;
      const coordinates = CITY_COORDINATES[selectedCity] || COUNTY_COORDINATES[selectedCity];
      if (coordinates) {
        const locPosition = new kakao.maps.LatLng(coordinates.lat, coordinates.lng);
        mapRef.current.setCenter(locPosition);
        // 여기에 axios get /map/category 날려서 값 받아와야 함
      } else {
        console.error('Coordinates not found for:', selectedCity);
      }
    }
  }, [selectedCity]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !(event.target as HTMLElement).closest('.customDropdown.cityDropdown') &&
        !(event.target as HTMLElement).closest('.customDropdown.districtDropdown')
      ) {
        setIsCityDropdownOpen(false);
        setIsDistrictDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const clearMarkers = () => {
    markers.forEach(marker => marker.setMap(null));
    setMarkers([]);
  };
  const clearPlaces = () => {
    places.forEach(place => place.marker.setMap(null));
    setPlaces([]);
  };

  useEffect(() => {
    if(!markerClicked) return;


    places.forEach((place)=>{
      if(place.marker == markerRef.current){
        placeRef.current = place;
        // console.log('before placeref.current1')
        // console.log(placeRef.current);
        // place.infoWindow.open(mapRef.current, place.marker);
        place.infoWindow.setMap(mapRef.current);
        place.infoWindow.setPosition(place.marker.getPosition());
        place.infoWindow.setVisible(true);
        mapRef.current.panTo(new kakao.maps.LatLng(
          place.marker.getPosition().getLat(),
          place.marker.getPosition().getLng()
        ));




        kakao.maps.event.addListener(place.infoWindow, 'click', function(){
          console.log('add click event on place.infoWindow')
          kakao.maps.event.removeListener(mapRef.current, 'click', function(){
            console.log('removed map listener');
          });
        });





        setTimeout(() => {
          placeRef.current = place;
          // console.log('before placeref.current2')
          // console.log(placeRef.current);
          const button = document.querySelector('.openDetail');
          if(button !== null){
            console.log('opendetail');
            button.addEventListener('click', (event) => {
              // window.location.href="./detail";

              navigate('/detail');
              event.stopPropagation();
            });
          }
        }, 500);
      }
      else{
        place.infoWindow.setVisible(false);
      }
    });
    setMarkerClicked(false);
  }, [markerClicked]);
  useEffect(() => {
    if(!isKakaoLoaded) return;
    kakao.maps.event.removeListener(mapRef.current, 'click', function(){});
    if(!mapClicked) return;
console.log('mapclicked');
    places.forEach((place)=>{
      place.infoWindow.setVisible(false);
    });
    setMapClicked(false);
  }, [mapClicked]);

  const handleSearchClick = async () => {
    if (!isKakaoLoaded) {
      console.log("Kakao Maps API is not loaded yet");
      return;
    }

    try {
      const response = await axios.get('/map/search', { params: { searchword: searchInput } });
      const data = response.data.documents[0];

      clearMarkers();

      const { kakao } = window as any;
      const locPosition = new kakao.maps.LatLng(data.y, data.x);
      mapRef.current.setCenter(locPosition);

      const imageSize = new kakao.maps.Size(36, 43);
      const imageOption = { offset: new kakao.maps.Point(18, 43) };
      const markerImage = new kakao.maps.MarkerImage('marker.png', imageSize, imageOption);

      const marker = new kakao.maps.Marker({
        map: mapRef.current,
        position: locPosition,
        image: markerImage,
      });
      // infoWindow 생성
      const infoWindow = new kakao.maps.CustomOverlay({
        content: "infoWindow content",
        clickable: true,
        zIndex: 3000
      });;



      // const [markerClicked, setMarkerClicked] = useState<boolean>(false);
      // const markerRef = useRef<any>(null);

      kakao.maps.event.addListener(marker, 'click', function(){
        console.log('marker clicked');
        markerRef.current = marker;
        setMarkerClicked(true);
      });
      kakao.maps.event.addListener(mapRef.current, 'click', function(){
        console.log('map clicked');
        places.forEach((place)=>{
          place.CustomOverlay.setVisible(false);
        });
      });



    } catch (error) {
      console.error('Error fetching data:', error);
      alert('검색 결과가 없습니다.');
    }
  };

  const toggleCityDropdown = () => {
    setIsCityDropdownOpen(!isCityDropdownOpen);
    setIsDistrictDropdownOpen(false);
  };

  const toggleDistrictDropdown = () => {
    setIsDistrictDropdownOpen(!isDistrictDropdownOpen);
    setIsCityDropdownOpen(false);
  };

  const selectCity = (city: string) => {
    setSelectedCity(city);
    setSelectedDistrict(CITIES[city][0]);
    setIsCityDropdownOpen(false);
  };

  const selectDistrict = (district: string) => {
    setSelectedDistrict(district);
    setIsDistrictDropdownOpen(false);

    try{
      // const response = await axios.get('/map/search', { params: { searchword: searchInput } });
      // const data = response.data;

      const csvToJson = (csv: string): object[] => {
        const result = Papa.parse(csv, {
          header: true,  // This ensures that the first row is treated as keys for JSON objects
          skipEmptyLines: true,  // Skips empty lines if any
        });
        
        return result.data;
      };
      
      // Example CSV input
      const csvData = `"complex_name","province","city","address","household_number","heating_system","house_type","elevator","rental_business_operator","parkinglot_number","building_shape","building_completion_date"
부천영상 행복주택(지역전략산업),경기도,부천시 원미구,경기도 부천시 원미구 길주로 17,"850","",아파트,"",LH인천,"0","","2023-05-01"
녹번역이편한세상캐슬(응암2)_서울리츠2호,서울특별시,은평구,서울특별시 은평구 은평로 220,"163",개별난방,아파트,전체동 설치,SH공사,"2974",혼합식,"2020-05-19"
신반포자이,서울특별시,서초구,서울특별시 서초구 잠원로 60,"71",지역난방,아파트,전체동 설치,SH공사,"981",계단식,"2018-07-27"
청주산단2(행복),충청북도,청주시 흥덕구,충청북도 청주시 흥덕구 공단로 58,"30",개별가스난방,아파트,전체동 설치,LH충북,"25","","2022-11-28"
문경흥덕 행복주택,경상북도,문경시,경상북도 문경시 호서로 175,"200","",아파트,"",LH대구경북,"0","","2021-12-01"`;
      
      const jsonData = csvToJson(csvData);
      // console.log(jsonData);
      const data = jsonData;



      // data: 5 objects
      // column name
      //   complex_name, address, province, city
      //   building_completion_dat, building_shape, elevator, heating_system, house_type, household_number, parkinglot_number, rental_business_operator

      // todos
      //   address -> (lng, lat)

      function openDetail(){
        console.log('openDetail function occured')
      }


      clearMarkers();
      clearPlaces();
      data.forEach(elem => {
        var geocoder = new kakao.maps.services.Geocoder();

        var callback = function(result, status) {
          if (status === kakao.maps.services.Status.OK) {
            elem.x = result[0].x;
            elem.y = result[0].y;
            
            const { kakao } = window as any;
            const locPosition = new kakao.maps.LatLng(elem.y, elem.x);

            // mapRef.current.setCenter(locPosition);
            mapRef.current.setCenter(new kakao.maps.LatLng(COUNTY_COORDINATES[district].lat, COUNTY_COORDINATES[district].lng));

            const imageSize = new kakao.maps.Size(36, 43);
            const imageSource = markerPng;
            const imageOption = { offset: new kakao.maps.Point(18, 43) };
            const markerImage = new kakao.maps.MarkerImage(imageSource, imageSize, imageOption);
            const marker = new kakao.maps.Marker({
              map: mapRef.current,
              position: locPosition,
              image: markerImage,
            });
            // infoWindow 생성
            const infoWindow = new kakao.maps.CustomOverlay({
              content:
              `<div class='infoWindow'>
                <div class='shortInfo'>
                  <div class='shortInfoTitle'>
                    <p class='complex_name'>${elem.complex_name}</p>
                    <p class='recruitment_status'></p>
                    <button class='openDetail'>상세정보</button>
                  </div>
                  <div class='address'>${elem.address || '-'}</div>
                  <div class='shortInfoData'>
                    <div class='name'>세대 수</div>
                    <div class='data'>${elem.household_number || '-'}</div>
                    <div class='name'>난방시설</div>
                    <div class='data'>${elem.heating_system || '-'}</div>
                    <div class='name'>건물 유형</div>
                    <div class='data'>${elem.house_type || '-'}</div>
                    <div class='name'>승강기 설치</div>
                    <div class='data'>${elem.elevator || '-'}</div>
                    <div class='name'>주차장</div>
                    <div class='data'>${elem.parkinglot_number || '-'}</div>
                    <div class='name'>건물 형태</div>
                    <div class='data'>${elem.building_shape || '-'}</div>
                    <div class='name'>준공일자</div>
                    <div class='data'>${elem.building_completion_date || '-'}</div>
                  </div>
                </div>
              </div>`,
              clickable: true
            });
            
            setMarkers(prevMarkers => [...prevMarkers, marker]);
            
            kakao.maps.event.addListener(marker, 'click', function(){
              markerRef.current = marker;
              setMarkerClicked(true);
            });
            kakao.maps.event.addListener(mapRef.current, 'click', function(){
              setMapClicked(true);
            });
            
            setMarkers(prevMarkers => [...prevMarkers, marker]);
            setPlaces(prevPlaces => [...prevPlaces, new SearchedPlace(elem, marker, infoWindow)]);
          }
        };

        geocoder.addressSearch(elem.address, callback);
      });
      // console.log(markers);









    }catch(error){
      console.error('Error fetching data:', error);
      alert('필터 결과가 없습니다.');
    }
  };
  return (
        <Routes>
          <Route path="/" element={
            <>
              <div className="mapContainer">
                {/* 검색 박스 */}
                <div className="searchBox">
                  <div className="searchLeft" onClick={handleRefreshPage}>
                    <img src="public/images/logo.png" alt="user icon" className="searchLogoIcon" />
                    <span className="searchText">청년여기</span>
                  </div>
                  <div className="searchRight">
                    <input
                      type="text"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      placeholder="주소를 입력해주세요"
                    />
                    <button onClick={handleSearchClick} className="searchButton">
                      <img src="public/images/magnifier.png" alt="search icon" className="searchButtonIcon" />
                    </button>
                  </div>
                </div>

                {/* 필터 컨테이너 */}
                <div className="filterContainer">
                  <div className="customDropdown cityDropdown">
                    <button className="dropdownButton" onClick={toggleCityDropdown}>
                      {selectedCity}
                    </button>
                    {isCityDropdownOpen && (
                      <div className="dropdownContent">
                        {Object.keys(CITIES).map(city => (
                          <div key={city} className="dropdownItem" onClick={() => selectCity(city)}>
                            {city}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <img src="public/images/arrow.png" alt="arrow" className="dropdownArrow" />

                  <div className="customDropdown districtDropdown">
                    <button className="dropdownButton" onClick={toggleDistrictDropdown}>
                      {selectedDistrict}
                    </button>
                    {isDistrictDropdownOpen && (
                      <div className="dropdownContent">
                        {CITIES[selectedCity].map(district => (
                          <div key={district} className="dropdownItem" onClick={() => selectDistrict(district)}>
                            {district}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* 전체/진행 중 토글 버튼 그룹 */}
                <div className="toggleButtonGroup">
                  <button
                    className={`toggleButton ${isAllSelected ? 'active' : ''}`}
                    onClick={handleToggleAllClick}>
                    전체
                  </button>
                  <button
                    className={`toggleButton ${!isAllSelected ? 'active' : ''}`}
                    onClick={handleToggleProgressClick}>
                    진행 중
                  </button>
                </div>

                {/* 찜 목록 버튼 - 찜 목록이 보일 때는 숨김 */}
                {!isWishlistVisible && (
                  <button className="bookmarkButton" onClick={handleWishlistClick}>
                    <img src="public/images/bookmark-icon.png" alt="bookmark icon" className="bookmarkIcon" />
                    찜 목록
                </button>
                )}

                {/* 찜 목록 표시 - 찜 목록 버튼이 클릭되면 화면을 꽉 채우게 */}
                {isWishlistVisible && (
                  <>
                    {/* 찜 목록 닫기 버튼 */}
                    <button className="wishlistCloseButton" onClick={handleWishlistClose} aria-label="Close wishlist">
                      <img src="public/images/close-icon.png" alt="Close" className="wishlistCloseIcon" />
                    </button>

                    <div className="wishlistContainerFull">
                      <h1>찜 목록</h1>
                      <ul>
                        {wishlistItems.map((item, index) => (
                          <li key={index}>
                            {item}
                            <button className="wishlistRemoveButton" onClick={() => handleRemoveWishlistItem(index)} aria-label="Remove from wishlist"></button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
                
                {/* 지도 영역 */}
                <div id="map"></div>
              </div>
            </>
          } />
          <Route path="/detail" element={<DetailPage  place={placeRef.current} />}></Route>
        </Routes>
  );
};

export default Map;



interface DetailPageProps{
  // placeRef: MutableRefObject<SearchedPlace | null>;
  place: SearchedPlace;
}

function SectionComponent({place}: DetailPageProps) {
  const location = place.location;
  return (
    <div className='detailedInfo'>
      <div className='infoAddress'>
        <div>주소</div><div>{location.address || '-'}</div>
      </div>
      <div className='infoOthers'>
        <div>세대수</div><div>{location.household_number || '-'}</div>
        <div>난방방식</div><div>{location.heating_system || '-'}</div>
        <div>주택유형</div><div>{location.house_type || '-'}</div>
        <div>승강기</div><div>{location.elevator || '-'}</div>
        <div>임대사업자</div><div>{location.rental_business_operator || '-'}</div>
        <div>주차수</div><div>{location.parkinglot_number || '-'}</div>
        <div>건물형태</div><div>{location.building_shape || '-'}</div>
        <div>준공일자</div><div>{location.building_completion_date || '-'}</div>
      </div>
    </div>
  );
}

function TypeComponent({place}: DetailPageProps) {
  return <div>This is the Shape Component</div>;
}

function RecruitComponent({place}: DetailPageProps) {
  return <div>This is the Recruit Component</div>;
}

function DetailPage({place}: DetailPageProps) {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState<string>('sectionInfo');

  const handleDetailBack = ()=>{
    navigate('/');
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'sectionInfo':
        return <SectionComponent place={place} />;
      case 'typeInfo':
        return <TypeComponent place={place} />;
      case 'recruitInfo':
        return <RecruitComponent place={place} />;
      default:
        return null;
    }
  };

  return (
    <div className='detailWrap'>
      <button className='back' onClick={handleDetailBack}>{'<'} 돌아가기</button>
      <div className='title'>
        <h1>{place.location.complex_name}</h1>
      </div>

      {/* Button to toggle components */}
      <div className='buttonList'>
        <button onClick={() => setActiveComponent('sectionInfo')}>Section</button>
        |
        <button onClick={() => setActiveComponent('typeInfo')}>Type</button>
        |
        <button onClick={() => setActiveComponent('recruitInfo')}>Recruit</button>
      </div>

      {/* Render the selected component */}
      <div className="component-container">
        {renderComponent()}
      </div>
    </div>
  );
}