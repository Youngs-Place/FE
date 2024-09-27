/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import axios from 'axios'
import { useEffect, useState } from 'react'


const Search = () => { // @ts-ignore
  const [searchInput, setSearchInput] = useState(''); // @ts-ignore
  const [map, setMap] = useState<kakao.maps.Map | null>(null);

  useEffect(()=>{
    // kakao.maps not defined
    const scriptOnload = async () => {
      const script = await document.querySelector('script#callAPI') as HTMLScriptElement | null;

      const kk = await window.kakao;
      const kk2 = await window.kakao.maps;
      console.log(kk);
      console.log(kk2);


      script && (script.onload = () => {
      // (script.onload = () => {
        console.log('a');
        // const { kakao } = window as any;
        const container = document.querySelector('div#map');
        const options = { // @ts-ignore
          // center: new kakao.maps.LatLng(placeRef.current.marker.getPosition().getLat(), placeRef.current.marker.getPosition().getLng()),
          center: new kakao.maps.LatLng(33.450701, 126.570667),
          level: 4,
        }; // @ts-ignore
        const kakaoMap = new kakao.maps.Map(container, options);
        setMap(kakaoMap);
      })();
    };
    scriptOnload();
  }, []);

  const handleRefreshPage = () => {
    window.location.reload() // 페이지 새로고침
  }
  const handleSearchClick = async () => {
    try {
      const response = await axios.get('/map/search', {
        params: { searchword: searchInput },
      })
      const data = response.data.documents[0];

      // clearMarkers()

      const { kakao } = window;
      const locPosition = new kakao.maps.LatLng(data.y, data.x)
      map !== null && map.setCenter(locPosition);

      const imageSize = new kakao.maps.Size(43, 43)
      const imageOption = { offset: new kakao.maps.Point(18, 43) }
      const markerImage = new kakao.maps.MarkerImage(
        'marker.png',
        imageSize,
        imageOption
      )

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const marker = new kakao.maps.Marker({
        map: map,
        position: locPosition,
        image: markerImage,
      })
      // infoWindow 생성
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const infoWindow = new kakao.maps.CustomOverlay({
        content: 'infoWindow content',
        clickable: true,
        zIndex: 3000,
      })

      // const [markerClicked, setMarkerClicked] = useState<boolean>(false);
      // const markerRef = useRef<any>(null);

      // // 마커 클릭 이벤트 (간편정보 창 열기)
      // kakao.maps.event.addListener(marker, 'click', function () {
      //   console.log('marker clicked')
      //   markerRef.current = marker
      //   setMarkerClicked(true)
      // })
      // // 맵 클릭 이벤트 (간편정보 창 닫기)
      // kakao.maps.event.addListener(mapRef.current, 'click', function () {
      //   console.log('map clicked')
      //   places.forEach((place) => {
      //     place.CustomOverlay.setVisible(false)
      //   })
      // })
    } catch (error) {
      console.error('Error fetching data:', error)
      alert('검색 결과가 없습니다.')
    }
  }

  return (
    <div className="searchBox">
      <div className="searchLeft" onClick={handleRefreshPage}>
        <img
          src="src/images/logo.png"
          alt="user icon"
          className="searchLogoIcon"
        />
        <span className="searchText">청년여기</span>
      </div>
      <div className="searchRight">
        <input
          type="text"
          // value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="주소를 입력해주세요"
        />
        <button onClick={handleSearchClick} className="searchButton">
          <img
            src="src/images/magnifier.png"
            alt="search icon"
            className="searchButtonIcon"
          />
        </button>
      </div>
    </div>
  )
}

export default Search
