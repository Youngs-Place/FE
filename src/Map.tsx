import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './map.css';

const CITIES = {
  '서울특별시': ['중구', '서대문구', '강남구'],
  '부산광역시': ['중구', '서대문구', '강남구'],
  '대구광역시': ['중구', '서대문구', '강남구']
}; //데이터 랑 연결하면 될듯??

const CITY_COORDINATES = {
  '서울특별시': { lat: 37.5665, lng: 126.9780 },
  '부산광역시': { lat: 35.1796, lng: 129.0756 },
  '대구광역시': { lat: 35.8722, lng: 128.6014 }
}; //필터 선택하면 해당 좌표로 이동함

const Map: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('서울특별시');
  const [selectedDistrict, setSelectedDistrict] = useState<string>(CITIES['서울특별시'][0]);
  const [isKakaoLoaded, setIsKakaoLoaded] = useState<boolean>(false);
  const [markers, setMarkers] = useState<any[]>([]);
  const mapRef = useRef<any>(null);

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

      {/* 찜 목록 버튼에 아이콘 추가 */}
      <button className="bookmark-button">
        <img src="public/images/bookmark-icon.png" alt="bookmark icon" className="bookmark-icon" />
        찜 목록
      </button>

      <div id="map"></div>
    </div>
  );
};

export default Map;
