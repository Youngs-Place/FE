/* eslint-disable @typescript-eslint/no-explicit-any */

// global.d.ts
interface KakaoMaps {
  maps: {
    LatLng: new (latitude: number, longitude: number) => any;  // Replace 'any' with a more specific type if possible
    Map: new (container: HTMLElement, options: object) => any;  // Replace 'any' with a more specific type
    Marker: new (options: object) => any;
    CustomOverlay: new (options: object) => any;
    Size: new (width: number, height: number) => any;
    Point: new (x: number, y: number) => any;
    MarkerImage: new (src: string, size: KakaoMaps['maps']['Size'], options?: object) => any;
    // Add more Kakao Maps types as needed
  };
}

interface Window {
  kakao: KakaoMaps;
}