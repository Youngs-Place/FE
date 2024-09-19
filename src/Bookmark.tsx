import { useState } from "react";

const Bookmark = () => {
  const isWishlistVisible = false;
  const [wishlistItems, setWishlistItems] = useState<string[]>(Array(10).fill('서울특별시 종로구 종로 56길 순위권 시티타워'));

  const handleWishlistClick = () => {

  }

  const handleWishlistClose = () => {

  }

  // @ts-ignore
  const handleRemoveWishlistItem = (index) => {
    
  }

  return (
    <>
      {/* 찜 목록 버튼 - 찜 목록이 보일 때는 숨김 */}
      {!isWishlistVisible && (
        <button className="bookmarkButton" onClick={handleWishlistClick}>
          <img
            src="src/images/bookmark-icon.png"
            alt="bookmark icon"
            className="bookmarkIcon"
          />
          찜 목록
        </button>
      )}

      {/* 찜 목록 표시 - 찜 목록 버튼이 클릭되면 화면을 꽉 채우게 */}
      {isWishlistVisible && (
        <>
          {/* 찜 목록 닫기 버튼 */}
          <button
            className="wishlistCloseButton"
            onClick={handleWishlistClose}
            aria-label="Close wishlist"
          >
            <img
              src="src/images/close-icon.png"
              alt="Close"
              className="wishlistCloseIcon"
            />
          </button>

          <div className="wishlistContainerFull">
            <h1>찜 목록</h1>
            <ul>
              {wishlistItems.map((item, index) => (
                <li key={index}>
                  { // @ts-ignore
                  } {item}
                  <button
                    className="wishlistRemoveButton"
                    onClick={() => handleRemoveWishlistItem(index)}
                    aria-label="Remove from wishlist"
                  ></button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  )
}

export default Bookmark
