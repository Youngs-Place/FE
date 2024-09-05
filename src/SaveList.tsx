import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface SaveItem {
  complex_name: string;
  address: string;
}

const SaveList = () => {
  const [saveList, setSaveList] = useState<SaveItem[]>([]);

  // 로컬 스토리지에서 찜 목록 불러오기
  useEffect(() => {
    const savedItems = localStorage.getItem('savelist');
    if (savedItems) {
      setSaveList(JSON.parse(savedItems));
    }
  }, []);

  // 찜 추가
  const addSaveItem = async (complexName: string) => {
    const response = await axios.get<SaveItem>(`http://localhost:3000/save/${complexName}`);
    const newSaveList = [...saveList, response.data];

    // 로컬 스토리지에 저장
    localStorage.setItem('savelist', JSON.stringify(newSaveList));
    setSaveList(newSaveList);
  };

  // 찜 목록 삭제
  const clearSaveList = () => {
    localStorage.removeItem('savelist');
    setSaveList([]);
  };

  return (
    <div>
      <h1>찜 목록</h1>
      <ul>
        {saveList.map((item, index) => (
          <li key={index}>
            {item.complex_name} - {item.address}
          </li>
        ))}
      </ul>
      <button onClick={() => addSaveItem('Some Complex Name')}>단지 찜하기</button>
      <button onClick={clearSaveList}>찜 목록 삭제</button>
    </div>
  );
};

export default SaveList;
