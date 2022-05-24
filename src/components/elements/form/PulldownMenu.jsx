/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';

const pulldownMenuStyle = css({
  maxWidth: '300px',
});

export const PulldownMenu = ({
  itemList = [],
  refs = {},
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
      css={pulldownMenuStyle}
      name={name}
      id={id}
      defaultValue={defaultValue}
      onChange={onChange}
    >
      {option_list}
    </select>
  );
};
