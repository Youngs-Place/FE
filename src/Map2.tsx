import Bookmark from './Bookmark'
import KakaoMap from './KakaoMap'
import Search from './Search'
import Select from './Select'
import './Map2.css'
import ToggleAnnouncement from './ToggleAnnouncement'

const Map2 = () => {
  return (
    <div>
      {/* 지도 그리기 */}
      <KakaoMap />

      {/* 검색창 */}
      <Search />

      {/* 선택창 */}
      <Select />

      {/* 공고 모아보기 */}
      <ToggleAnnouncement />

      {/* 북마크 */}
      <Bookmark />
    </div>
  )
}

export default Map2
