import { useRecoilState } from "recoil";
import { showOnlyRecruiting } from './atom/states';

const ToggleAnnouncement = () => {
  const [isShowOnlyRecruiting, setIsShowOnlyRecruiting] = useRecoilState(showOnlyRecruiting);

  const handleToggleAllClick = () => {
    setIsShowOnlyRecruiting(false);
  }

  const handleToggleProgressClick = () => {
    setIsShowOnlyRecruiting(true);
  }

  return <div className="toggleButtonGroup">
  <button
    className={`toggleButton ${isShowOnlyRecruiting ? '' : 'active'}`}
    onClick={handleToggleAllClick}>
    전체
  </button>
  <button
    className={`toggleButton ${isShowOnlyRecruiting ? 'active' : ''}`}
    onClick={handleToggleProgressClick}>
    진행 중
  </button>
</div>
}

export default ToggleAnnouncement;