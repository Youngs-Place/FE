import { useState } from "react";
import { CITIES } from "./map/cities";

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
