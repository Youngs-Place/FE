import { useState } from "react";
import { CITIES } from "./map/cities";

import Papa from 'papaparse';

/* eslint-disable @typescript-eslint/ban-ts-comment */
const Select = () => {
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState<boolean>(false);
  const [isDistrictDropdownOpen, setIsDistrictDropdownOpen] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<string>('서울특별시');
  const [selectedDistrict, setSelectedDistrict] = useState<string>(CITIES['서울특별시'][0]);
  // const CITIES = {'cityA': ['districtA', 'districtB'], 'cityB': ['districtC', 'districtD']};

  const toggleCityDropdown = () => {
    setIsCityDropdownOpen(!isCityDropdownOpen);
    setIsDistrictDropdownOpen(false);
  };

  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const selectCity = (city: string) => {
    setSelectedCity(city);
    setSelectedDistrict(CITIES[city][0]);
    setIsCityDropdownOpen(false);
  }

  const toggleDistrictDropdown = () => {
    setIsDistrictDropdownOpen(!isDistrictDropdownOpen);
    setIsCityDropdownOpen(false);
  }

  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const selectDistrict = (district: string) => {
    setSelectedDistrict(district);
    setIsDistrictDropdownOpen(false);
    try{
      const csvToJson = (csv: string): object[] => {
        console.log(csv);
        const result = Papa.parse(csv, {
          header: true,  // This ensures that the first row is treated as keys for JSON objects
          skipEmptyLines: true,  // Skips empty lines if any
        });
        
        return result.data as object[];
      };

      // fetch search api
      // fetch 결과는 장소 데이터 n개
      // 각 결과마다 SearchedPlace 생성
      //    location
      //    marker
      //    infowindow
      // infowindow는 customoverlay 사용해야 함
      // -> 별도 컨테이너로 만들 것
      // 
      
    }catch(error){
      console.error('Error fetching data:', error);
      alert('필터 결과가 없습니다.');
    }
  }

  return (
    <div className="filterContainer">
      <div className="customDropdown cityDropdown">
        <button className="dropdownButton" onClick={toggleCityDropdown}>
          {selectedCity}
        </button>
        {isCityDropdownOpen && (
          <div className="dropdownContent">
            {Object.keys(CITIES).map((city) => (
              <div
                key={city}
                className="dropdownItem"
                onClick={() => selectCity(city)}
              >
                {city}
              </div>
            ))}
          </div>
        )}
      </div>

      <img src="src/images/arrow.png" alt="arrow" className="dropdownArrow" />

      <div className="customDropdown districtDropdown">
        <button className="dropdownButton" onClick={toggleDistrictDropdown}>
          {selectedDistrict}
        </button>
        {isDistrictDropdownOpen && (
          <div className="dropdownContent">
            { // @ts-ignore
            } {CITIES[selectedCity].map((district) => (
              <div
                key={district}
                className="dropdownItem"
                onClick={() => selectDistrict(district)}
              >
                {district}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Select
