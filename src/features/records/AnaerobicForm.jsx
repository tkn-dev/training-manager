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

export default function AnaerobicFrom({ weightMessage, repetitionMessage, isHidden }) {
  return (
    <div css={isHidden ? hidden : ''}>
      <label css={inputLabel} htmlFor="weight">
        重さ
        {/* Todo kgとlbのどちらを使うか選べるようにする */}
        <input type="number" name="weight" id="weightKg" min="0" />
        <input type="number" name="weight" id="weightLb" min="0" hidden />
        <p id="weightMessage">{weightMessage}</p>
      </label>

      <label css={inputLabel} htmlFor="repetition">
        回数
        <input type="number" name="repetition" id="repetition" min="0" />
        <p id="repetitionMessage">{repetitionMessage}</p>
      </label>
    </div>
  );
}

AnaerobicFrom.propTypes = {
  weightMessage: PropTypes.string,
  repetitionMessage: PropTypes.string,
  isHidden: PropTypes.bool,
};

AnaerobicFrom.defaultProps = {
  weightMessage: '',
  repetitionMessage: '',
  isHidden: false,
};
