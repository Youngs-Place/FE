import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './map.css';

// 시군구 데이터 및 좌표 설정 (데이터베이스 연결 필요)
const CITIES = {
  '서울특별시': ['중구', '서대문구', '강남구'],
  '부산광역시': ['중구', '서대문구', '강남구'],
  '대구광역시': ['중구', '서대문구', '강남구'],
};

const CITY_COORDINATES = {
  '서울특별시': { lat: 37.5665, lng: 126.9780 },
  '부산광역시': { lat: 35.1796, lng: 129.0756 },
  '대구광역시': { lat: 35.8722, lng: 128.6014 },
};

const Map: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('서울특별시');
  const [selectedDistrict, setSelectedDistrict] = useState<string>(CITIES['서울특별시'][0]);
  const [isKakaoLoaded, setIsKakaoLoaded] = useState<boolean>(false);
  const [markers, setMarkers] = useState<any[]>([]);
  const mapRef = useRef<any>(null);
  const [isAllSelected, setIsAllSelected] = useState<boolean>(true);
  const [isWishlistVisible, setIsWishlistVisible] = useState<boolean>(false); // 찜 목록 표시 여부 상태 추가
  const [wishlistItems, setWishlistItems] = useState<string[]>(Array(10).fill('서울특별시 종로구 종로 56길 순위권 시티타워')); // 찜 목록 상태 추가

  const handleToggleAllClick = () => {
    setIsAllSelected(true);
  };

  const handleToggleProgressClick = () => {
    setIsAllSelected(false);
  };

  const handleWishlistClick = () => {
    setIsWishlistVisible(true); // 찜 목록 버튼 클릭 시 찜 목록 표시
  };

  const handleWishlistClose = () => {
    setIsWishlistVisible(false); // 찜 목록 닫기
  };

  const handleRemoveWishlistItem = (index: number) => {
    setWishlistItems(prevItems => prevItems.filter((_, i) => i !== index)); // 해당 인덱스의 항목 제거
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP}&libraries=services&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      const { kakao } = window as any;
      kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new kakao.maps.LatLng(CITY_COORDINATES[selectedCity].lat, CITY_COORDINATES[selectedCity].lng),
          level: 4,
        };
        const map = new kakao.maps.Map(container, options);
        mapRef.current = map;
        setIsKakaoLoaded(true);
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (isKakaoLoaded) {
      const { kakao } = window as any;
      const locPosition = new kakao.maps.LatLng(CITY_COORDINATES[selectedCity].lat, CITY_COORDINATES[selectedCity].lng);
      mapRef.current.setCenter(locPosition);
    }
  }, [selectedCity]);

  const clearMarkers = () => {
    markers.forEach(marker => marker.setMap(null));
    setMarkers([]);
  };

  const handleSearchClick = async () => {
    if (!isKakaoLoaded) {
      console.log("Kakao Maps API is not loaded yet");
      return;
    }

    try {
      const response = await axios.get('/api/map/search', { params: { keyword: searchInput } });
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

      setMarkers(prevMarkers => [...prevMarkers, marker]);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('검색 결과가 없습니다.');
    }
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    setSelectedCity(selected);
    setSelectedDistrict(CITIES[selected][0]);
  };

  const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(event.target.value);
  };

  return (
    <div className="map-container">
      {/* 검색 박스 */}
      <div className="search-box">
        <div className="search-left">
          <img src="public/images/logo.png" alt="user icon" className="search-logoicon" />
          <span className="search-text">청년여기</span>
        </div>
        <div className="search-right">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="주소를 입력해주세요"
          />
          <button onClick={handleSearchClick} className="search-button">
            <img src="public/images/magnifier.png" alt="search icon" className="search-button-icon" />
          </button>
        </div>
      </div>

      {/* 필터 컨테이너 */}
      <div className="filter-container">
        <div className="filter-item">
          <select onChange={handleCityChange} value={selectedCity}>
            {Object.keys(CITIES).map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <img src="public/images/arrow.png" alt="arrow" className="dropdown-arrow" />

        <div className="filter-item">
          <select onChange={handleDistrictChange} value={selectedDistrict}>
            {CITIES[selectedCity].map(district => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 전체/진행 중 토글 버튼 그룹 */}
      <div className="toggle-button-group">
        <button
          className={`toggle-button ${isAllSelected ? 'active' : ''}`}
          onClick={handleToggleAllClick}>
          전체
        </button>
        <button
          className={`toggle-button ${!isAllSelected ? 'active' : ''}`}
          onClick={handleToggleProgressClick}>
          진행 중
        </button>
      </div>

      {/* 찜 목록 버튼 - 찜 목록이 보일 때는 숨김 */}
      {!isWishlistVisible && (
        <button className="bookmark-button" onClick={handleWishlistClick}>
          <img src="public/images/bookmark-icon.png" alt="bookmark icon" className="bookmark-icon" />
          찜 목록
        </button>
      )}

      {/* 찜 목록 표시 - 찜 목록 버튼이 클릭되면 화면을 꽉 채우게 */}
      {isWishlistVisible && (
        <>
          {/* 찜 목록 닫기 버튼 */}
          <button className="wishlist-close-button" onClick={handleWishlistClose} aria-label="Close wishlist">
            <img src="public/images/close-icon.png" alt="Close" className="wishlist-close-icon" />
          </button>

          <div className="wishlist-container-full">
            <h1>찜 목록</h1>
            <ul>
              {wishlistItems.map((item, index) => (
                <li key={index}>
                  {item}
                  <button className="wishlist-remove-button" onClick={() => handleRemoveWishlistItem(index)} aria-label="Remove from wishlist"></button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {/* 지도 영역 */}
      <div id="map"></div>
    </div>
  );
};

export default Map;
