/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';
import PropTypes from 'prop-types';

const inputLabel = css({
  width: '100%',
});

export default function AnaerobicFrom({ setNum }) {
  return (
    <div>
      <label css={inputLabel} htmlFor={`weight${setNum}`}>
        重さ
        {/* Todo kgとlbのどちらを使うか選べるようにする */}
        <input type="number" name={`weight${setNum}`} id={`weightKg${setNum}`} min="0" />
        <input type="number" name={`weight${setNum}`} id={`weightLb${setNum}`} min="0" hidden />
        <p id={`weightMessage${setNum}`}></p>
      </label>

      <label css={inputLabel} htmlFor={`repetition${setNum}`}>
        回数
        <input type="number" name={`repetition${setNum}`} id={`repetition${setNum}`} min="0" />
        <p id={`repetitionMessage${setNum}`}></p>
      </label>

      <label css={inputLabel} htmlFor={`memo${setNum}`}>
        メモ
        <input type="text" name={`memo${setNum}`} id={`memo${setNum}`} />
      </label>

      <label css={inputLabel} htmlFor={`support${setNum}`}>
        補助
        <input type="checkbox" name={`support${setNum}`} id={`support${setNum}`} />
      </label>

      <label css={inputLabel} htmlFor={`leftOrRight${setNum}`}>
        左右
        <div>
          <input
            type="radio"
            name={`leftOrRight${setNum}`}
            id={`left${setNum}`}
            defaultValue={'left'}
          />
          <label htmlFor={`left${setNum}`}>左</label>
          <input
            type="radio"
            name={`leftOrRight${setNum}`}
            id={`none${setNum}`}
            defaultValue={'none'}
            defaultChecked
          />
          <label htmlFor={`none${setNum}`}>未指定</label>
          <input
            type="radio"
            name={`leftOrRight${setNum}`}
            id={`right${setNum}`}
            defaultValue={'right'}
          />
          <label htmlFor={`right${setNum}`}>右</label>
        </div>
      </label>
    </div>
  );
}

AnaerobicFrom.propTypes = {
  setNum: PropTypes.number,
};

AnaerobicFrom.defaultProps = {
  setNum: 1,
};
