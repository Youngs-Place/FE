// src/map/cities.ts
export const CITIES = {
    '서울특별시': ['종로구', '중구', '용산구', '성동구', '광진구', '동대문구', '중랑구', '성북구', '강북구', '도봉구', '노원구', '은평구', '서대문구', '마포구', '양천구', '강서구', '구로구', '금천구', '영등포구', '동작구', '관악구', '서초구', '강남구', '송파구', '강동구'],
    '부산광역시': ['중구', '서구', '동구', '영도구', '부산진구', '동래구', '남구', '북구', '해운대구', '사하구', '금정구', '강서구', '연제구', '수영구', '사상구'],
    '대구광역시': ['중구', '동구', '서구', '남구', '북구', '수성구', '달서구', '달성군'],
    '인천광역시': ['중구', '동구', '미추홀구', '연수구', '남동구', '부평구', '계양구', '서구', '강화군', '옹진군'],
    '광주광역시': ['동구', '서구', '남구', '북구', '광산구'],
    '대전광역시': ['동구', '중구', '서구', '유성구', '대덕구'],
    '울산광역시': ['중구', '남구', '동구', '북구', '울주군'],
    '세종특별자치시': [],
    '경기도': ['수원시', '고양시', '용인시', '성남시', '부천시', '안산시', '안양시', '남양주시', '화성시', '평택시', '의정부시', '시흥시', '파주시', '김포시', '광명시', '광주시', '군포시', '이천시', '오산시', '하남시', '양주시', '구리시', '안성시', '포천시', '의왕시', '여주시', '양평군', '동두천시', '과천시', '가평군', '연천군'],
    '강원도': ['춘천시', '원주시', '강릉시', '동해시', '태백시', '속초시', '삼척시', '홍천군', '횡성군', '영월군', '평창군', '정선군', '철원군', '화천군', '양구군', '인제군', '고성군', '양양군'],
    '충청북도': ['청주시', '충주시', '제천시', '보은군', '옥천군', '영동군', '증평군', '진천군', '괴산군', '음성군', '단양군'],
    '충청남도': ['천안시', '공주시', '보령시', '아산시', '서산시', '논산시', '계룡시', '당진시', '금산군', '부여군', '서천군', '청양군', '홍성군', '예산군', '태안군'],
    '전라북도': ['전주시', '군산시', '익산시', '정읍시', '남원시', '김제시', '완주군', '진안군', '무주군', '장수군', '임실군', '순창군', '고창군', '부안군'],
    '전라남도': ['목포시', '여수시', '순천시', '나주시', '광양시', '담양군', '곡성군', '구례군', '고흥군', '보성군', '화순군', '장흥군', '강진군', '해남군', '영암군', '무안군', '함평군', '영광군', '장성군', '완도군', '진도군', '신안군'],
    '경상북도': ['포항시', '경주시', '김천시', '안동시', '구미시', '영주시', '영천시', '상주시', '문경시', '경산시', '군위군', '의성군', '청송군', '영양군', '영덕군', '청도군', '고령군', '성주군', '칠곡군', '예천군', '봉화군', '울진군', '울릉군'],
    '경상남도': ['창원시', '진주시', '통영시', '사천시', '김해시', '밀양시', '거제시', '양산시', '의령군', '함안군', '창녕군', '고성군', '남해군', '하동군', '산청군', '함양군', '거창군', '합천군'],
    '제주특별자치도': ['제주시', '서귀포시']
};

export const CITY_COORDINATES = {
    '서울특별시': { lat: 37.5665, lng: 126.9780 },
    '부산광역시': { lat: 35.1796, lng: 129.0756 },
    '대구광역시': { lat: 35.8722, lng: 128.6014 },
    '인천광역시': { lat: 37.4563, lng: 126.7052 },
    '광주광역시': { lat: 35.1595, lng: 126.8526 },
    '대전광역시': { lat: 36.3504, lng: 127.3845 },
    '울산광역시': { lat: 35.5384, lng: 129.3114 },
    '세종특별자치시': { lat: 36.4875, lng: 127.2817 },
    '경기도': { lat: 37.566, lng: 127.009 },
    '강원도': { lat: 37.8604, lng: 128.311 },
    '충청북도': { lat: 36.6285, lng: 127.929 },
    '충청남도': { lat: 36.5184, lng: 126.8 },
    '전라북도': { lat: 35.717, lng: 127.153 },
    '전라남도': { lat: 34.8679, lng: 126.991 },
    '경상북도': { lat: 36.4919, lng: 128.888 },
    '경상남도': { lat: 35.4606, lng: 128.213 },
    '제주특별자치도': { lat: 33.4996, lng: 126.531 }
};

export const COUNTY_COORDINATES = {
    // 서울특별시
    '종로구': { lat: 37.5707, lng: 126.9794 },
    '중구': { lat: 37.5636, lng: 126.9976 },
    '용산구': { lat: 37.5326, lng: 127.0246 },
    '성동구': { lat: 37.5632, lng: 127.0428 },
    '광진구': { lat: 37.5381, lng: 127.0727 },
    '동대문구': { lat: 37.5748, lng: 127.0386 },
    '중랑구': { lat: 37.6063, lng: 127.0925 },
    '성북구': { lat: 37.5891, lng: 127.0170 },
    '강북구': { lat: 37.6382, lng: 127.0250 },
    '도봉구': { lat: 37.6520, lng: 127.0284 },
    '노원구': { lat: 37.6573, lng: 127.0700 },
    '은평구': { lat: 37.6040, lng: 126.9297 },
    '서대문구': { lat: 37.5792, lng: 126.9368 },
    '마포구': { lat: 37.5660, lng: 126.9031 },
    '양천구': { lat: 37.5172, lng: 126.8661 },
    '강서구': { lat: 37.5502, lng: 126.8491 },
    '구로구': { lat: 37.5041, lng: 126.8874 },
    '금천구': { lat: 37.4587, lng: 126.9016 },
    '영등포구': { lat: 37.5264, lng: 126.9076 },
    '동작구': { lat: 37.5018, lng: 126.9403 },
    '관악구': { lat: 37.4781, lng: 126.9517 },
    '서초구': { lat: 37.4833, lng: 127.0328 },
    '강남구': { lat: 37.4981, lng: 127.0276 },
    '송파구': { lat: 37.5143, lng: 127.1062 },
    '강동구': { lat: 37.5500, lng: 127.1460 },

    // 부산광역시
    '중구': { lat: 35.1028, lng: 129.0403 },
    '서구': { lat: 35.0956, lng: 129.0150 },
    '동구': { lat: 35.1056, lng: 129.0406 },
    '영도구': { lat: 35.0883, lng: 129.0774 },
    '부산진구': { lat: 35.1562, lng: 129.0592 },
    '동래구': { lat: 35.2230, lng: 129.0753 },
    '남구': { lat: 35.1178, lng: 129.0753 },
    '북구': { lat: 35.1712, lng: 129.0150 },
    '해운대구': { lat: 35.1641, lng: 129.1603 },
    '사하구': { lat: 35.0972, lng: 128.9894 },
    '금정구': { lat: 35.2201, lng: 129.0550 },
    '강서구': { lat: 35.1801, lng: 128.9571 },
    '연제구': { lat: 35.1731, lng: 129.0592 },
    '수영구': { lat: 35.1611, lng: 129.1234 },
    '사상구': { lat: 35.1456, lng: 128.9843 },

    // 대구광역시
    '중구': { lat: 35.8708, lng: 128.5914 },
    '동구': { lat: 35.8808, lng: 128.6172 },
    '서구': { lat: 35.8668, lng: 128.5987 },
    '남구': { lat: 35.8314, lng: 128.6094 },
    '북구': { lat: 35.8893, lng: 128.6037 },
    '수성구': { lat: 35.8551, lng: 128.6140 },
    '달서구': { lat: 35.8461, lng: 128.5848 },
    '달성군': { lat: 35.7144, lng: 128.5306 },

    // 인천광역시
    '중구': { lat: 37.4644, lng: 126.6241 },
    '동구': { lat: 37.4535, lng: 126.6147 },
    '미추홀구': { lat: 37.4691, lng: 126.6523 },
    '연수구': { lat: 37.4520, lng: 126.6761 },
    '남동구': { lat: 37.4532, lng: 126.7345 },
    '부평구': { lat: 37.4974, lng: 126.7200 },
    '계양구': { lat: 37.5581, lng: 126.7277 },
    '서구': { lat: 37.4855, lng: 126.7103 },
    '강화군': { lat: 37.7494, lng: 126.4865 },
    '옹진군': { lat: 37.4556, lng: 126.5890 },

    // 광주광역시
    '동구': { lat: 35.1595, lng: 126.8526 },
    '서구': { lat: 35.1570, lng: 126.9217 },
    '남구': { lat: 35.1374, lng: 126.8831 },
    '북구': { lat: 35.1842, lng: 126.9027 },
    '광산구': { lat: 35.2172, lng: 126.8301 },

    // 대전광역시
    '동구': { lat: 36.3268, lng: 127.4404 },
    '중구': { lat: 36.3221, lng: 127.4351 },
    '서구': { lat: 36.3332, lng: 127.3857 },
    '유성구': { lat: 36.3720, lng: 127.3512 },
    '대덕구': { lat: 36.3615, lng: 127.4157 },

    // 울산광역시
    '중구': { lat: 35.5581, lng: 129.3116 },
    '남구': { lat: 35.5438, lng: 129.3140 },
    '동구': { lat: 35.5278, lng: 129.4143 },
    '북구': { lat: 35.5892, lng: 129.3177 },
    '울주군': { lat: 35.5414, lng: 129.2381 },

    // 세종특별자치시
    // 세종특별자치시는 좌표 정보가 없습니다.

    // 경기도
    '수원시': { lat: 37.2636, lng: 127.0286 },
    '고양시': { lat: 37.6560, lng: 126.8318 },
    '용인시': { lat: 37.2334, lng: 127.0055 },
    '성남시': { lat: 37.4380, lng: 127.1375 },
    '부천시': { lat: 37.5026, lng: 126.7646 },
    '안산시': { lat: 37.3211, lng: 126.8300 },
    '안양시': { lat: 37.3911, lng: 126.9304 },
    '남양주시': { lat: 37.6358, lng: 127.2054 },
    '화성시': { lat: 37.2043, lng: 127.0236 },
    '평택시': { lat: 36.9987, lng: 127.0858 },
    '의정부시': { lat: 37.7371, lng: 127.0518 },
    '시흥시': { lat: 37.4334, lng: 126.8011 },
    '파주시': { lat: 37.7504, lng: 126.7839 },
    '김포시': { lat: 37.6161, lng: 126.7376 },
    '광명시': { lat: 37.4562, lng: 126.8991 },
    '광주시': { lat: 37.3955, lng: 127.2784 },
    '군포시': { lat: 37.3578, lng: 126.9275 },
    '이천시': { lat: 37.2714, lng: 127.4318 },
    '오산시': { lat: 37.1555, lng: 127.0665 },
    '하남시': { lat: 37.5454, lng: 127.2071 },
    '양주시': { lat: 37.8060, lng: 127.0575 },
    '구리시': { lat: 37.5996, lng: 127.1283 },
    '안성시': { lat: 37.0141, lng: 127.2776 },
    '포천시': { lat: 37.8946, lng: 127.2005 },
    '의왕시': { lat: 37.3395, lng: 126.9855 },
    '여주시': { lat: 37.2980, lng: 127.6370 },
    '양평군': { lat: 37.4918, lng: 127.4877 },
    '동두천시': { lat: 37.9055, lng: 127.0702 },
    '과천시': { lat: 37.4180, lng: 126.9981 },
    '가평군': { lat: 37.8315, lng: 127.5095 },
    '연천군': { lat: 38.0968, lng: 127.0752 },

    // 강원도
    '춘천시': { lat: 37.8814, lng: 127.7296 },
    '원주시': { lat: 37.3415, lng: 127.9558 },
    '강릉시': { lat: 37.7512, lng: 128.8761 },
    '동해시': { lat: 37.5211, lng: 129.1070 },
    '태백시': { lat: 37.1597, lng: 128.9867 },
    '속초시': { lat: 38.2074, lng: 128.5912 },
    '삼척시': { lat: 37.4481, lng: 129.1644 },
    '홍천군': { lat: 37.7147, lng: 127.9412 },
    '횡성군': { lat: 37.3571, lng: 128.0038 },
    '영월군': { lat: 37.1884, lng: 128.4531 },
    '평창군': { lat: 37.3880, lng: 128.4024 },
    '정선군': { lat: 37.3158, lng: 128.6806 },
    '철원군': { lat: 38.2388, lng: 127.3136 },
    '화천군': { lat: 38.1115, lng: 127.5853 },
    '양구군': { lat: 38.1078, lng: 127.2045 },
    '인제군': { lat: 38.0665, lng: 128.2071 },
    '고성군': { lat: 38.2841, lng: 128.4592 },
    '양양군': { lat: 38.0846, lng: 128.6341 },

    // 충청북도
    '청주시': { lat: 36.6375, lng: 127.4891 },
    '충주시': { lat: 36.9950, lng: 127.9301 },
    '제천시': { lat: 37.1473, lng: 129.1664 },
    '보은군': { lat: 36.4087, lng: 127.6808 },
    '옥천군': { lat: 36.2157, lng: 127.4492 },
    '영동군': { lat: 36.1476, lng: 127.4238 },
    '증평군': { lat: 36.7832, lng: 127.4596 },
    '진천군': { lat: 36.8396, lng: 127.4170 },
    '괴산군': { lat: 36.7714, lng: 127.9894 },
    '음성군': { lat: 36.8346, lng: 127.5038 },
    '단양군': { lat: 36.9987, lng: 128.3800 },

    // 충청남도
    '천안시': { lat: 36.8154, lng: 127.1137 },
    '공주시': { lat: 36.4564, lng: 127.1150 },
    '보령시': { lat: 36.2746, lng: 126.6058 },
    '아산시': { lat: 36.7980, lng: 127.0010 },
    '서산시': { lat: 36.7772, lng: 126.4532 },
    '논산시': { lat: 36.2037, lng: 127.1063 },
    '계룡시': { lat: 36.3035, lng: 127.2776 },
    '당진시': { lat: 36.7825, lng: 126.6184 },
    '금산군': { lat: 36.1472, lng: 127.3773 },
    '부여군': { lat: 36.3005, lng: 126.9442 },
    '서천군': { lat: 36.0202, lng: 126.6031 },
    '청양군': { lat: 36.3894, lng: 126.8252 },
    '홍성군': { lat: 36.5648, lng: 126.6831 },
    '예산군': { lat: 36.7886, lng: 126.7926 },
    '태안군': { lat: 36.7696, lng: 126.2903 },

    // 전라북도
    '전주시': { lat: 35.8242, lng: 127.1480 },
    '군산시': { lat: 35.9661, lng: 126.7357 },
    '익산시': { lat: 35.9448, lng: 126.9760 },
    '정읍시': { lat: 35.5834, lng: 126.8491 },
    '남원시': { lat: 35.3716, lng: 127.3974 },
    '김제시': { lat: 35.8150, lng: 126.8906 },
    '완주군': { lat: 35.8662, lng: 127.2015 },
    '진안군': { lat: 35.7742, lng: 127.3188 },
    '무주군': { lat: 35.8383, lng: 127.2373 },
    '장수군': { lat: 35.5808, lng: 127.4464 },
    '임실군': { lat: 35.5646, lng: 127.3133 },
    '순창군': { lat: 35.5931, lng: 127.1897 },
    '고창군': { lat: 35.4343, lng: 126.7015 },
    '부안군': { lat: 35.6820, lng: 126.7695 },

    // 전라남도
    '목포시': { lat: 34.8120, lng: 126.3968 },
    '여수시': { lat: 34.7603, lng: 127.6626 },
    '순천시': { lat: 34.9464, lng: 127.4874 },
    '나주시': { lat: 35.0168, lng: 126.7011 },
    '광양시': { lat: 34.9707, lng: 127.6661 },
    '담양군': { lat: 35.3281, lng: 126.9774 },
    '곡성군': { lat: 35.2247, lng: 127.3056 },
    '구례군': { lat: 35.1562, lng: 127.4990 },
    '고흥군': { lat: 34.6065, lng: 127.2874 },
    '보성군': { lat: 34.7617, lng: 127.0586 },
    '화순군': { lat: 35.0248, lng: 126.9751 },
    '장흥군': { lat: 34.7015, lng: 126.9612 },
    '강진군': { lat: 34.5821, lng: 126.8353 },
    '해남군': { lat: 34.5900, lng: 126.5922 },
    '영암군': { lat: 34.6719, lng: 126.6851 },
    '무안군': { lat: 34.9580, lng: 126.4340 },
    '함평군': { lat: 35.0483, lng: 126.5948 },
    '영광군': { lat: 35.2481, lng: 126.4544 },
    '장성군': { lat: 35.2330, lng: 126.8467 },
    '완도군': { lat: 34.3011, lng: 126.7742 },
    '진도군': { lat: 34.4808, lng: 126.3326 },
    '신안군': { lat: 34.8297, lng: 125.3798 },

    // 경상북도
    '포항시': { lat: 36.0192, lng: 129.3439 },
    '경주시': { lat: 35.8466, lng: 129.2255 },
    '김천시': { lat: 36.1392, lng: 128.1150 },
    '안동시': { lat: 36.5665, lng: 128.7293 },
    '구미시': { lat: 36.1198, lng: 128.3291 },
    '영주시': { lat: 36.5600, lng: 128.7295 },
    '영천시': { lat: 35.9631, lng: 128.8680 },
    '상주시': { lat: 36.4171, lng: 128.1628 },
    '문경시': { lat: 36.5973, lng: 128.1858 },
    '경산시': { lat: 35.7555, lng: 128.7397 },
    '군위군': { lat: 36.3804, lng: 128.4870 },
    '의성군': { lat: 36.4111, lng: 128.9020 },
    '청송군': { lat: 36.3882, lng: 128.8237 },
    '영양군': { lat: 36.6614, lng: 129.0486 },
    '영덕군': { lat: 36.4248, lng: 129.3711 },
    '청도군': { lat: 35.7575, lng: 128.7695 },
    '고령군': { lat: 35.7671, lng: 128.3007 },
    '성주군': { lat: 35.8334, lng: 128.2119 },
    '칠곡군': { lat: 35.9584, lng: 128.5921 },
    '예천군': { lat: 36.6862, lng: 128.4987 },
    '봉화군': { lat: 36.8962, lng: 128.8006 },
    '울진군': { lat: 36.8515, lng: 129.3906 },
    '울릉군': { lat: 37.4823, lng: 130.8704 },

    // 경상남도
    '창원시': { lat: 35.2270, lng: 128.6812 },
    '진주시': { lat: 35.1720, lng: 128.1040 },
    '통영시': { lat: 34.8367, lng: 128.4236 },
    '사천시': { lat: 34.9704, lng: 128.2403 },
    '김해시': { lat: 35.2325, lng: 128.8805 },
    '밀양시': { lat: 35.4886, lng: 128.7422 },
    '거제시': { lat: 34.8833, lng: 128.6208 },
    '양산시': { lat: 35.3391, lng: 129.0306 },
    '의령군': { lat: 35.3262, lng: 128.2627 },
    '함안군': { lat: 35.2234, lng: 128.4475 },
    '창녕군': { lat: 35.5494, lng: 128.4380 },
    '고성군': { lat: 35.2321, lng: 128.4340 },
    '남해군': { lat: 34.8285, lng: 127.9454 },
    '하동군': { lat: 35.1361, lng: 127.7563 },
    '산청군': { lat: 35.3484, lng: 127.9543 },
    '함양군': { lat: 35.4436, lng: 127.6275 },
    '거창군': { lat: 35.6645, lng: 127.9654 },
    '합천군': { lat: 35.5836, lng: 128.1858 },

    // 제주특별자치도
    '제주시': { lat: 33.4996, lng: 126.5312 },
    '서귀포시': { lat: 33.2548, lng: 126.5592 }
};