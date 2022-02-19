/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';
import PropTypes from 'prop-types';

const inputLabel = css({
  width: '100%',
});
const hidden = css({
  width: 0,
  height: 0,
  visibility: 'hidden',
});

export default function AerobicForm({ distanceMessage, runTimeMessage, isHidden }) {
  return (
    <div css={isHidden ? hidden : ''}>
      <label css={inputLabel} htmlFor="distance">
        距離
        {/* Todo kmとmileのどちらを使うか選べるようにする */}
        <input type="number" name="distance" id="distanceKm" min="0" />
        <input type="number" name="distance" id="distanceMile" min="0" hidden />
        <p id="distanceMessage">{distanceMessage}</p>
      </label>

      <label css={inputLabel} htmlFor="runTime">
        時間
        <input type="time" name="runTime" id="runTime" min="0" />
        <p id="runTimeMessage">{runTimeMessage}</p>
      </label>
    </div>
  );
}

AerobicForm.propTypes = {
  distanceMessage: PropTypes.string,
  runTimeMessage: PropTypes.string,
  isHidden: PropTypes.bool,
};

AerobicForm.defaultProps = {
  dictanceMessage: '',
  runTimeMessage: '',
  isHidden: false,
};
