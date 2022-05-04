/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';

const submit = css({});

export const Submit = ({ value = 'submit', onClick = (f) => f }) => {
  return <input type="submit" css={submit} value={value} onClick={onClick} />;
};
