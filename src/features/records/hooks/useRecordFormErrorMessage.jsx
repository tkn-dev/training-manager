import React, { useCallback, useState } from 'react';

export const useRecordFormErrorMessage = () => {
  const defaultSetErrors = useCallback(() => {
    return {
      weightError: '',
      repetitionError: '',
      distanceError: '',
      exerciseTimeError: '',
      memoError: '',
    };
  });

  const defaultErrors = useCallback(() => {
    return {
      count: 0,
      fullDateError: '',
      exerciseListError: '',
      set1: defaultSetErrors(),
      set2: defaultSetErrors(),
      set3: defaultSetErrors(),
      set4: defaultSetErrors(),
      set5: defaultSetErrors(),
      set6: defaultSetErrors(),
      set7: defaultSetErrors(),
      set8: defaultSetErrors(),
      set9: defaultSetErrors(),
      set10: defaultSetErrors(),
    };
  });

  const [errors, setErrors] = useState(defaultErrors());

  const setError = (error) => {
    setErrors({ ...errors, ...error });
  };

  const resetErrors = () => {
    setErrors(defaultErrors());
  };

  return [errors, { setError, resetErrors }];
};
