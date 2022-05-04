/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';
import { MdAddCircle } from 'react-icons/md';

const addItemStyle = (props) =>
  css(
    {
      color: 'green',
      width: '30px',
      height: '30px',
    },
    props,
  );

export const AddItem = ({ appendCss = css({}), onClick = (f) => f }) => {
  return <MdAddCircle css={addItemStyle(appendCss.styles)} onClick={onClick} />;
};
