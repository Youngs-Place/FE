import { useEffect } from 'react'
import './Map2.css';
import { useRecoilState } from 'recoil';
import { currentPlaceOption } from './atom/states';
import { SearchedPlace } from './atom/class';
import { SimpleHouseData } from './types/data';

const KakaoMap = () => {
  const [currentPlaceOptions, setCurrentPlaceOptions] = useRecoilState(currentPlaceOption);

  useEffect(() => {
    const throwError = () => {
      throw new Error('script#callAPI not found');
    }
    try {
      const script = document.querySelector('script#callAPI');
      script ? console.log('script#callAPI exist') : throwError();
    } catch {
      const script = document.createElement('script')
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP}&libraries=services&autoload=false`
      script.id = 'callAPI'
      document.head.appendChild(script);
      console.log('script#callAPI created');
    }
    const script: HTMLScriptElement | null = document.querySelector('script#callAPI');
    // console.log('1', script);
    script !== null && (script.onload = () => {
      // console.log('2', script);
      window.kakao.maps.load(() => {
        const container = document.getElementById("map") as HTMLElement;
        
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 4,
        };
        const map = new window.kakao.maps.Map(container, options);
        // setCurrentPlaceOptions(options);
        const placeData: SimpleHouseData = {
          lat: 33.450701,
          lng: 126.570667,
          name: "",
          recruitState: true,
          address: "",
          houseType: "",
          householdNumber: 0,
        };
        setCurrentPlaceOptions(new SearchedPlace(placeData));
      });

    })
  }, [])

  return <div id="map"></div>
}

export default KakaoMap
