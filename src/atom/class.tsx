// kakao가 동적으로 로드할 js 라이브러리에 있어서 인식이 안 된다.
// .d.ts에 형식을 정의해서 ts에 인식시킬 수 있다고 한다.
// 임시로 @ts-ignore를 붙였으나 추후 타입 정의할 것
// 다른 파일에서는 const { kakao } = window as any;를 사용했으나 여기에서는 안 된다.

export class SearchedPlace {
  location: any // @ts-ignore
  marker: kakao.maps.Marker | null // @ts-ignore
  infoWindow: kakao.maps.CustomOverlay | null // @ts-ignore

  constructor(
    location: object, // @ts-ignore
    marker: kakao.maps.Marker | null = null, // @ts-ignore
    infoWindow: kakao.maps.CustomOverlay | null = null
  ) {
    this.location = location
    this.marker = marker
    this.infoWindow = infoWindow
  } // @ts-ignore

  createMarker(y: number, x: number): kakao.maps.Marker {
    const map = document.querySelector('div#map') // @ts-ignore
    this.marker = new kakao.maps.Marker({
      map: map, // @ts-ignore
      position: new kakao.maps.LatLng(y, x),
    })
    return this.marker
  } // @ts-ignore
  createInfoWindow(str: string = ''): kakao.maps.CustomOverlay {
    // @ts-ignore
    this.infoWindow = new kakao.maps.CustomOverlay({
      content: str,
    })
    return this.infoWindow
  }
}
