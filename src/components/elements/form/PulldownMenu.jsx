/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import { FormControl, Select, MenuItem, FormHelperText } from '@mui/material';
import { TEXT_FIELD } from '../../../style/constants';

const container = (props) =>
  css(
    {
      display: 'inline-block',
      height: TEXT_FIELD.HEIGHT_MIDDLE,
    },
    props,
  );
const pulldownMenuStyle = css({
  padding: '0.5rem 1.5rem 0.5rem 0.5rem',
  borderColor: 'rgba(0, 0, 0, 0.12)',
  borderRadius: '4px',
  fontSize: TEXT_FIELD.FONT_SIZE_MIDDLE,
  height: TEXT_FIELD.HEIGHT_MIDDLE,
  '&:hover': {
    borderColor: 'rgba(0, 0, 0, 0.87)',
  },
});

export const PulldownMenu = ({
  itemList = [''],
  refs = {},
  appendCss = css({}),
  name,
  id,
  defaultValue,
  onChange = (f) => f,
  errorMessage,
}) => {
  const [value, setValue] = useState(defaultValue ? defaultValue : '');

  const option_list = itemList.map((item, i) => (
    <MenuItem key={i.toString()} value={item}>
      {item}
    </MenuItem>
  ));
  const firstValue = itemList[0] ? itemList[0] : '';
  const formValue = itemList.includes(value) ? value : firstValue;

  return (
    <FormControl css={container(appendCss)} error={errorMessage ? true : false}>
      <Select
        inputRef={refs.selectRef}
        css={pulldownMenuStyle}
        name={name}
        id={id}
        defaultValue={defaultValue}
        value={value == defaultValue ? value : formValue}
        onChange={(event) => {
          onChange(event);
          setValue(event.target.value);
        }}
      >
        {option_list}
      </Select>
      <FormHelperText>{errorMessage}</FormHelperText>
    </FormControl>
  );
};
