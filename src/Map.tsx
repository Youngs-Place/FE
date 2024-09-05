import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './map.css';

const CITIES = {
  '서울특별시': ['중구', '서대문구', '강남구'],
  '부산광역시': ['중구', '서대문구', '강남구'],
  '대구광역시': ['중구', '서대문구', '강남구'],
  '서울특별시2': ['중구', '서대문구', '강남구'],
  '부산광역시3': ['중구', '서대문구', '강남구'],
  '대구광역시1': ['중구', '서대문구', '강남구'],
  '서울특별시12': ['중구', '서대문구', '강남구'],
  '부산광역시11': ['중구', '서대문구', '강남구'],
  '대구광역시11': ['중구', '서대문구', '강남구'],
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
  const [isWishlistVisible, setIsWishlistVisible] = useState<boolean>(false);
  const [wishlistItems, setWishlistItems] = useState<string[]>(Array(10).fill('서울특별시 종로구 종로 56길 순위권 시티타워'));
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState<boolean>(false);
  const [isDistrictDropdownOpen, setIsDistrictDropdownOpen] = useState<boolean>(false);

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
  };

  return (
    <div className="mapContainer">
      <div className="searchBox">
        <div className="searchLeft">
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

      {!isWishlistVisible && (
        <button className="bookmarkButton" onClick={handleWishlistClick}>
          <img src="public/images/bookmark-icon.png" alt="bookmark icon" className="bookmarkIcon" />
          찜 목록
        </button>
      )}

      {isWishlistVisible && (
        <>
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

      <div id="map"></div>
    </div>
  );
};

export default Map;
