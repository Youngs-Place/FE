const ToggleAnnouncement = () => {
  const isAllSelected = true;

  const handleToggleAllClick = () => {

  }

  const handleToggleProgressClick = () => {
    
  }

  return <div className="toggleButtonGroup">
  <button
    className={`toggleButton ${isAllSelected ? 'active' : ''}`}
    onClick={handleToggleAllClick}>
    전체
  </button>
  <button
    className={`toggleButton ${!isAllSelected ? 'active' : ''}`}
    onClick={handleToggleProgressClick}>
    진행 중
  </button>
</div>
}

export default ToggleAnnouncement;