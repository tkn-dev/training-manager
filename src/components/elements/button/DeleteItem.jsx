/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';
import { MdDelete } from 'react-icons/md';

const deleteItemStyle = (props) =>
  css(
    {
      color: 'gray',
      width: '30px',
      height: '30px',
    },
    props,
  );

export const DeleteItem = ({ appendCss = css({}), onClick = (f) => f }) => {
  return <MdDelete css={deleteItemStyle(appendCss.styles)} onClick={onClick} />;
};
