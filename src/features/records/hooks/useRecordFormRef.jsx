import React, { useCallback, useRef, useState } from 'react';

export const useRecordFormRef = () => {
  const refs = useCallback(() => {
    return {
      weight: useRef(null),
      weightType: useRef(null),
      repetition: useRef(null),
      isSupported: useRef(null),
      distance: useRef(null),
      distanceType: useRef(null),
      exerciseTime: useRef(null),
      memo: useRef(null),
    };
  });

  const [refList] = useState({
    set1: refs(),
    set2: refs(),
    set3: refs(),
    set4: refs(),
    set5: refs(),
    set6: refs(),
    set7: refs(),
    set8: refs(),
    set9: refs(),
    set10: refs(),
  });

  const getCurtValue = (ref) => {
    if (ref.current) {
      return ref.current.value !== '' ? ref.current.value : null;
    } else {
      return null;
    }
  };

  const getCurtChecked = (ref) => {
    return ref.current ? ref.current.checked : null;
  };

  const getCurtValueList = () => {
    const valueList = [...Array(10)].map((_, i) => {
      const setNum = i + 1;
      return {
        weight: getCurtValue(refList[`set${setNum}`].weight),
        weightType: getCurtValue(refList[`set${setNum}`].weightType),
        repetition: getCurtValue(refList[`set${setNum}`].repetition),
        isSupported: getCurtChecked(refList[`set${setNum}`].isSupported),
        distance: getCurtValue(refList[`set${setNum}`].distance),
        distanceType: getCurtValue(refList[`set${setNum}`].distanceType),
        exerciseTime: getCurtValue(refList[`set${setNum}`].exerciseTime),
        memo: getCurtValue(refList[`set${setNum}`].memo),
      };
    });
    return valueList;
  };

  return [refList, { getCurtValueList }];
};
