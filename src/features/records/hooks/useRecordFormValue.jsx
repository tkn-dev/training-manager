import React, { useCallback, useState } from 'react';
import { zeroPadding } from '../../../util/zeroPadding';

export const useRecordFormValue = () => {
  const defaultSelectedNum = 2;
  const date = new Date();
  const today =
    date.getFullYear() + zeroPadding(date.getMonth() + 1, 2) + zeroPadding(date.getDate(), 2);
  const defaultSetFormValues = useCallback(() => {
    return {
      weight: null,
      weight_type: null,
      repetition: null,
      is_supported: null,
      distance: null,
      distance_type: null,
      exercise_time: null,
      memo: null,
      recorded_at: null,
    };
  });

  const defaultRecordFormValues = useCallback(() => {
    return {
      exercise_date: today,
      exercise: null,
      is_aerobic: null,
      set_number: defaultSelectedNum,
      set1: defaultSetFormValues(),
      set2: defaultSetFormValues(),
      set3: defaultSetFormValues(),
      set4: defaultSetFormValues(),
      set5: defaultSetFormValues(),
      set6: defaultSetFormValues(),
      set7: defaultSetFormValues(),
      set8: defaultSetFormValues(),
      set9: defaultSetFormValues(),
      set10: defaultSetFormValues(),
    };
  });

  const [recordFormValues, setRecordFormValues] = useState(defaultRecordFormValues());

  const setRecordFormValue = useCallback((recordFormValue) => {
    setRecordFormValues({ ...recordFormValues, ...recordFormValue });
  });

  const resetRecordFormValue = useCallback((mode = 0) => {
    // mode = 0: all reset
    if (mode === 0) setRecordFormValues(defaultRecordFormValues());
    // mode = 1: leave only date
    if (mode === 1)
      setRecordFormValues({
        ...defaultRecordFormValues(),
        exercise_date: recordFormValues.exercise_date,
      });
  });

  const setCurtValueList = useCallback((valueList) => {
    const curtValues = { ...recordFormValues };
    const times = recordFormValues.is_aerobic === 1 ? 1 : recordFormValues.set_number;
    for (let i = 0; i < times; i++) {
      const setNum = `set${i + 1}`;
      curtValues[`${setNum}`].weight = valueList[i].weight;
      curtValues[`${setNum}`].weight_type = valueList[i].weightType;
      curtValues[`${setNum}`].repetition = valueList[i].repetition;
      curtValues[`${setNum}`].is_supported = valueList[i].isSupported;
      curtValues[`${setNum}`].distance = valueList[i].distance;
      curtValues[`${setNum}`].distance_type = valueList[i].distanceType;
      curtValues[`${setNum}`].exercise_time = valueList[i].exerciseTime;
      curtValues[`${setNum}`].memo = valueList[i].memo;
    }
    setRecordFormValues(curtValues);
  });

  const validateRecordFormValues = useCallback(
    (
      errors = {
        count: 0,
        set1: {},
        set2: {},
        set3: {},
        set4: {},
        set5: {},
        set6: {},
        set7: {},
        set8: {},
        set9: {},
        set10: {},
      },
    ) => {
      const record = recordFormValues;

      if (!record.exercise) {
        errors.exerciseListError = '種目を選択してください。';
        errors.count++;
        return errors;
      }

      if (record.is_aerobic) {
        if (!record['set1'].distance) {
          errors['set1'].distanceError = '距離を入力してください。';
          errors.count++;
        }
        if (!record['set1'].exercise_time) {
          errors['set1'].exerciseTimeError = '時間を入力してください。';
          errors.count++;
        }
        if (record['set1'].memo.length > 200) {
          errors['set1'].memoError = 'メモは200文字までです。';
          errors.count++;
        }
      }

      if (!record.is_aerobic) {
        for (let i = 1; i <= record.set_number; i++) {
          if (!record[`set${i}`].weight) {
            errors[`set${i}`].weightError = '重さを入力してください。';
            errors.count++;
          }
          if (!record[`set${i}`].repetition) {
            errors[`set${i}`].repetitionError = '回数を入力してください。';
            errors.count++;
          }
          if (record[`set${i}`].memo.length > 200) {
            errors[`set${i}`].memoError = 'メモは200文字までです。';
            errors.count++;
          }
        }
      }

      return errors;
    },
  );

  const getRecordFormValueForPost = useCallback(() => {
    const ret = [];
    const times = recordFormValues.is_aerobic ? 1 : recordFormValues.set_number;
    for (let i = 1; i <= times; i++) {
      const record = {
        exercise_date: recordFormValues.exercise_date,
        exercise: recordFormValues.exercise,
        is_aerobic: recordFormValues.is_aerobic,
        set_number: i,
        weight: recordFormValues[`set${i}`].weight,
        weight_type: recordFormValues[`set${i}`].weight_type,
        repetition: recordFormValues[`set${i}`].repetition,
        is_supported: recordFormValues[`set${i}`].is_supported,
        distance: recordFormValues[`set${i}`].distance,
        distance_type: recordFormValues[`set${i}`].distance_type,
        exercise_time: recordFormValues[`set${i}`].exercise_time,
        memo: recordFormValues[`set${i}`].memo,
        recorded_at: recordFormValues[`set${i}`].recorded_at,
      };
      ret[i - 1] = record;
    }
    return ret;
  });

  return [
    recordFormValues,
    {
      setRecordFormValue,
      setCurtValueList,
      validateRecordFormValues,
      resetRecordFormValue,
      getRecordFormValueForPost,
    },
  ];
};
