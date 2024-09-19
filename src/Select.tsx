const Select = () => {
  const selectedCity = 'cityA';
  const isCityDropdownOpen = true;
  const CITIES = {'cityA': ['districtA', 'districtB'], 'cityB': ['districtC', 'districtD']};
  const selectedDistrict = 'districtA';
  const isDistrictDropdownOpen = true;

  const toggleCityDropdown = () => {

  };

  // @ts-ignore
  const selectCity = (city) => {

  }

  const toggleDistrictDropdown = () => {

  }

  // @ts-ignore
  const selectDistrict = (district) => {

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
