/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';
import { PulldownMenu } from './PulldownMenu';

const inputLabel = css({
  width: '100%',
});

export const AerobicRecordForm = ({ errors = {}, refs = {} }) => {
  return (
    <div>
      <label css={inputLabel} htmlFor="distance1">
        距離
        <input ref={refs.distanceRef} type="number" name="distance1" id="distance1" min="0" />
        <PulldownMenu
          refs={{ selectRef: refs.distanceTypeRef }}
          itemList={['Km', 'Mile']}
          name={'distance1'}
          id={'distanceType1'}
          defaultValue={'Km'}
        />
      </label>
      <p id={'distanceError'}>{errors.distanceError}</p>

      <label css={inputLabel} htmlFor="exerciseTime1">
        時間
        <input
          ref={refs.exerciseTimeRef}
          type="number"
          name="exerciseTime1"
          id="exerciseTime1"
          min="0"
        />
        (分)
      </label>
      <p id={'exerciseTimeError'}>{errors.exerciseTimeError}</p>

      <label css={inputLabel} htmlFor="memo1">
        メモ
        <input ref={refs.memoRef} type="text" name="memo1" id="memo1" />
      </label>
      <p id={'memoError'}>{errors.memoError}</p>
    </div>
  );
};
