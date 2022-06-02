/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';
import { Button } from '@mui/material';

const submitStyle = (props) => css({}, props);

export const Submit = ({ value = 'submit', onClick = (f) => f, style, appendCss }) => {
  return (
    <Button variant="contained" className={style} css={submitStyle(appendCss)} onClick={onClick}>
      {value}
    </Button>
  );
  //return <input type="submit" css={submit} value={value} onClick={onClick} />;
};
