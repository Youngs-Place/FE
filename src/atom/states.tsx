import { atom } from "recoil";

export const currentPlace = atom({
  key: 'currentPlace',
  default: {},
})

export const searchedPlaces = atom({
  key: 'searchedPlaces',
  default: [],
})