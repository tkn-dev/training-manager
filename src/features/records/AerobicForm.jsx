/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';
import PropTypes from 'prop-types';

const inputLabel = css({
  width: '100%',
});

export default function AerobicForm({ setNum }) {
  return (
    <div>
      <label css={inputLabel} htmlFor="distance">
        距離
        {/* Todo kmとmileのどちらを使うか選べるようにする */}
        <input type="number" name="distance" id="distanceKm" min="0" />
        <input type="number" name="distance" id="distanceMile" min="0" hidden />
        <p id={`distanceMessage${setNum}`}></p>
      </label>

      <label css={inputLabel} htmlFor="runTime">
        時間
        <input type="time" name="runTime" id="runTime" min="0" />
        <p id={`runTimeMessage${setNum}`}></p>
      </label>

      <label css={inputLabel} htmlFor="memo1">
        メモ
        <input type="text" name="memo1" id="memo1" />
      </label>
    </div>
  );
}

AerobicForm.propTypes = {
  setNum: PropTypes.number,
};

AerobicForm.defaultProps = {
  setNum: 1,
};
