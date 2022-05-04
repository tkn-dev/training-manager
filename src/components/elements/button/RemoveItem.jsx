/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';
import { MdRemoveCircle } from 'react-icons/md';

const removeItemStyle = (props) =>
  css(
    {
      color: 'red',
      width: '30px',
      height: '30px',
    },
    props,
  );

export const RemoveItem = ({ appendCss = css({}), onClick = (f) => f }) => {
  return <MdRemoveCircle css={removeItemStyle(appendCss.styles)} onClick={onClick} />;
};
