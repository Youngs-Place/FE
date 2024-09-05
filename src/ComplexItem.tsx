// 예시: ComplexItem.tsx
import React from 'react';

interface ComplexItemProps {
  complexName: string;
}

const ComplexItem: React.FC<ComplexItemProps> = ({ complexName }) => {
  const addSaveItem = async () => {
    // SaveList 컴포넌트의 addSaveItem 함수 로직을 여기서도 사용할 수 있도록 합니다.
    // 또는 Context API나 Redux 등을 사용하여 상태와 함수를 공유할 수 있습니다.
  };

  return (
    <div>
      <h2>{complexName}</h2>
      {/* 기타 단지 정보 표시 */}
      <button onClick={addSaveItem}>찜하기</button>
    </div>
  );
};

export default ComplexItem;
