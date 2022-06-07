/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';
import { TEXT_FIELD } from '../../../style/constants';

const pulldownMenuStyle = (props) =>
  css(
    {
      padding: '0.5rem 1.5rem 0.5rem 0.5rem',
      borderColor: 'rgba(0, 0, 0, 0.12)',
      borderRadius: '4px',
      fontSize: TEXT_FIELD.FONT_SIZE_MIDDLE,
      height: TEXT_FIELD.HEIGHT_MIDDLE,
      '&:hover': {
        borderColor: 'rgba(0, 0, 0, 0.87)',
      },
    },
    props,
  );

export const PulldownMenu = ({
  itemList = [],
  refs = {},
  appendCss = css({}),
  name,
  id,
  defaultValue,
  onChange = (f) => f,
}) => {
  const option_list = itemList.map((item, i) => (
    <option key={i.toString()} value={item}>
      {item}
    </option>
  ));
  return (
    <select
      ref={refs.selectRef}
      css={pulldownMenuStyle(appendCss)}
      name={name}
      id={id}
      defaultValue={defaultValue}
      onChange={onChange}
    >
      {option_list}
    </select>
  );
};
