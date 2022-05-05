/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';
import { MdEdit } from 'react-icons/md';

const editItemStyle = (props) =>
  css(
    {
      color: 'green',
      width: '30px',
      height: '30px',
    },
    props,
  );

export const EditItem = ({ appendCss = css({}), onClick = (f) => f }) => {
  return <MdEdit css={editItemStyle(appendCss.styles)} onClick={onClick} />;
};
