/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';
import PropTypes from 'prop-types';
import PulldownMenu from '../../components/elements/form/PulldownMenu';

const container = css({
  display: 'flex',
  flexWrap: 'wrap',
});

const inputLabel = css({
  width: '100%',
});

export default function CreateRecord({ exerciseList, onSubmit }) {
  return (
    <div css={container}>
      <label css={inputLabel} htmlFor="exercise">
        種目
        <PulldownMenu
          itemList={exerciseList}
          name={'exercise'}
          id={'exercise'}
        />
      </label>
      <label css={inputLabel} htmlFor="weight">
        重さ
        <input type="number" name="weight" id="weight" min="0" />
      </label>
      <label css={inputLabel} htmlFor="repetition">
        回数
        <input type="number" name="repetition" id="repetition" min="0" />
      </label>
      <label css={inputLabel} htmlFor="memo">
        メモ
        <input type="text" name="memo" id="memo" />
      </label>
      <label css={inputLabel} htmlFor="support">
        補助
        <input type="checkbox" name="support" id="support" />
      </label>
      <label css={inputLabel} htmlFor="leftOrRight">
        左右
        <div>
          <input type="radio" name="leftOrRight" id="left" />
          <label htmlFor="left">左</label>
          <input type="radio" name="leftOrRight" id="both" defaultChecked />
          <label htmlFor="both">未指定</label>
          <input type="radio" name="leftOrRight" id="Right" />
          <label htmlFor="right">右</label>
        </div>
      </label>

      <button
        type="submit"
        onClick={() => {
          const record = {
            exercise: '',
            weight: 1,
            repetition: 1,
            memo: '',
            support: false,
            leftOrRight: 'both',
          };
          onSubmit(record);
        }}
      >
        submit
      </button>
    </div>
  );
}

CreateRecord.propTypes = {
  exerciseList: PropTypes.arrayOf(PropTypes.string),
  onSubmit: PropTypes.func,
};

CreateRecord.defaultProps = {
  exerciseList: ['test', 'list'],
  onSubmit: (f) => f,
};
