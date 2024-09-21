import { atom } from "recoil";
import { SearchedPlace } from "./class";

export const currentPlaceOption = atom<SearchedPlace | null>({
  key: 'currentPlaceOption',
  default: null,
})

export const searchedPlaces = atom<SearchedPlace[]>({
  key: 'searchedPlaces',
  default: [],
})

// {장소, 마커, 간편정보} <= 현재 장소
// {장소, 마커, 간편정보}[] <= 검색 결과 반환된 장소 목록