import { useEffect } from 'react'
import './Map2.css';
import { useRecoilState } from 'recoil';
import { currentPlace } from './atom/states';

const KakaoMap = () => {
  // @ts-ignore
  const [currentPlaceOptions, setCurrentPlaceOptions] = useRecoilState(currentPlace);

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
    script !== null && (script.onload = () => {
      
      const { kakao } = window as any;
      kakao.maps.load(() => {
        const container = document.getElementById("map");
        
        const options = {
          center: new kakao.maps.LatLng(33.450701, 126.570667),
          level: 4,
        };
        // @ts-ignore
        const map = new kakao.maps.Map(container, options);
        setCurrentPlaceOptions(options);
      });

    })
  }, [])

  return <div id="map"></div>
}

export default KakaoMap
