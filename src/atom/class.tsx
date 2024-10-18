/* eslint-disable @typescript-eslint/no-explicit-any */

// kakao가 동적으로 로드할 js 라이브러리에 있어서 인식이 안 된다.
// .d.ts에 형식을 정의해서 ts에 인식시킬 수 있다고 한다.
// 임시로 @ts-ignore를 붙였으나 추후 타입 정의할 것
// 다른 파일에서는 const { kakao } = window as any;를 사용했으나 여기에서는 안 된다.


import { SimpleHouseData } from '../types/data';
export class SearchedPlace {
  location: any
  marker: any
  infoWindow: any

  constructor(data: SimpleHouseData){
    const map = document.querySelector('div#map');
    this.location = new window.kakao.maps.LatLng(data.lat, data.lng);
    this.marker = new window.kakao.maps.Marker({
      map: map,
      position: this.location,
      image: new window.kakao.maps.MarkerImage(
        'marker.png',
        new window.kakao.maps.Size(43, 43),
        new window.kakao.maps.Point(18, 43),
      ),
    });
    this.infoWindow = new window.kakao.maps.CustomOverlay({
      content: `
        <div class='infoWindow'>
          <div class='shortInfo'>
            <div class='shortInfoTitle'>
              <p class='complex_name'>${data.name}</p>
              <p class='recruitment_status'>${data.recruitState?"모집 중":"공고 없음"}</p>
            </div>
            <div class='address'>${data.address || '-'}</div>
            <div class='shortInfoData'>
              <div class='name'>주택유형</div>
              <div class='data'>${data.houseType || '-'}</div>
              <div class='name'>세대 수</div>
              <div class='data'>${data.householdNumber || '-'}</div>
            </div>
            <div class='shortInfoButtons'>
              <button class='pick'><img src="/src/images/check-mark1.png">찜</button>
              <button class='openDetail'>상세정보</button>
            </div>
          </div>
        </div>
        `,
      clickable: true,
    });
  }

  setMarker(lat: number, lng: number) {
    const map = document.querySelector('div#map')
    this.marker = new window.kakao.maps.Marker({
      map: map,
      position: new window.kakao.maps.LatLng(lat, lng),
      image: new window.kakao.maps.MarkerImage(
        'marker.png',
        new window.kakao.maps.Size(43, 43),
        new window.kakao.maps.Point(18, 43),
      ),
    })
    return this.marker
  }
  setInfoWindow(str: string = '') {
    this.infoWindow = new window.kakao.maps.CustomOverlay({
      content: str,
      clickable: true,
    })
    return this.infoWindow
  }
}
