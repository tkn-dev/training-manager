/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';
import { Button } from '@mui/material';

export const Submit = ({ value = 'submit', onClick = (f) => f, style }) => {
  return (
    <Button variant="contained" className={style} onClick={onClick}>
      {value}
    </Button>
  );
  //return <input type="submit" css={submit} value={value} onClick={onClick} />;
};
