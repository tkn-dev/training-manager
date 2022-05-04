/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';
import PropTypes from 'prop-types';
import { PulldownMenu } from './PulldownMenu';

const inputLabel = css({
  width: '100%',
});

export const AnaerobicRecordForm = ({ setNum, errors = {}, refs = {} }) => {
  return (
    <div>
      <label css={inputLabel} htmlFor={`weight${setNum}`}>
        重さ
        <input
          ref={refs.weightRef}
          type="number"
          name={`weight${setNum}`}
          id={`weight${setNum}`}
          min="0"
        />
        <PulldownMenu
          refs={{ selectRef: refs.weightTypeRef }}
          itemList={['Kg', 'Lb']}
          name={`weight${setNum}`}
          id={`weightType${setNum}`}
          defaultValue={'Kg'}
        />
      </label>
      <p id={`weightError${setNum}`}>{errors.weightError}</p>

      <label css={inputLabel} htmlFor={`repetition${setNum}`}>
        回数
        <input
          ref={refs.repetitionRef}
          type="number"
          name={`repetition${setNum}`}
          id={`repetition${setNum}`}
          min="0"
        />
      </label>
      <p id={`repetitionError${setNum}`}>{errors.repetitionError}</p>

      <label css={inputLabel} htmlFor={`memo${setNum}`}>
        メモ
        <input ref={refs.memoRef} type="text" name={`memo${setNum}`} id={`memo${setNum}`} />
      </label>
      <p id={`memoError${setNum}`}>{errors.memoError}</p>

      <label css={inputLabel} htmlFor={`support${setNum}`}>
        補助
        <input
          ref={refs.supportRef}
          type="checkbox"
          name={`support${setNum}`}
          id={`support${setNum}`}
        />
      </label>
    </div>
  );
};

AnaerobicRecordForm.propTypes = {
  setNum: PropTypes.number,
};

AnaerobicRecordForm.defaultProps = {
  setNum: 1,
};
