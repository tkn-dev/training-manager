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

  const getCurtValue = useCallback((ref) => {
    if (ref.current) {
      return ref.current.value !== '' ? ref.current.value : null;
    } else {
      return null;
    }
  });

  const getCurtChecked = useCallback((ref) => {
    return ref.current ? ref.current.checked : null;
  });

  const getCurtValueList = useCallback(() => {
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
  });

  const setRefValue = useCallback((ref, value) => {
    if (ref.current) ref.current.value = value;
  });

  const setRefChecked = useCallback((ref, checked) => {
    if (ref.current) ref.current.checked = checked;
  });

  const setRefValues = useCallback((record) => {
    [...Array(record.maxSetNum)].map((_, i) => {
      const setNum = `set${i + 1}`;
      setRefValue(refList[`${setNum}`].weight, record.weight[i]);
      setRefValue(refList[`${setNum}`].weightType, record.weight_type[i]);
      setRefValue(refList[`${setNum}`].repetition, record.repetition[i]);
      setRefChecked(refList[`${setNum}`].isSupported, record.is_supported[i]);
      setRefValue(refList[`${setNum}`].distance, record.distance);
      setRefValue(refList[`${setNum}`].distanceType, record.distance_type);
      setRefValue(refList[`${setNum}`].exerciseTime, record.exercise_time);
      setRefValue(refList[`${setNum}`].memo, record.memo[i]);
    });
  });

  return [refList, { getCurtValueList, setRefValues }];
};
