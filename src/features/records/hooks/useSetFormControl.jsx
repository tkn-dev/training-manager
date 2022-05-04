/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useCallback, useState } from 'react';

const disabledButtonStyle = css({
  color: 'gray',
});

export const useSetFormControl = (setNum, setSetNum) => {
  const [buttonStyle, setButtonStyle] = useState({
    addItem: css({}),
    removeItem: css({}),
  });

  const add = useCallback(() => {
    if (setNum < 10) {
      setSetNum(setNum + 1);
    }
  });

  const remove = useCallback(() => {
    if (setNum > 1) {
      setSetNum(setNum - 1);
    }
  });

  const updateButtonStyle = useCallback(() => {
    if (setNum === 10) {
      setButtonStyle({ addItem: css(disabledButtonStyle), removeItem: css({}) });
    } else if (setNum === 1) {
      setButtonStyle({ addItem: css({}), removeItem: css(disabledButtonStyle) });
    } else {
      setButtonStyle({ addItem: css({}), removeItem: css({}) });
    }
  });

  const enable = useCallback(() => {
    updateButtonStyle();
  });

  const disable = useCallback(() => {
    setButtonStyle({ addItem: css(disabledButtonStyle), removeItem: css(disabledButtonStyle) });
  });

  return [
    buttonStyle,
    {
      add,
      remove,
      enable,
      disable,
      updateButtonStyle,
    },
  ];
};
