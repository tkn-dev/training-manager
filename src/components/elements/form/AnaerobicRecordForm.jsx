/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';
import { Box } from '@mui/material';
import { TextField } from '@mui/material';
import { PulldownMenu } from './PulldownMenu';
import { FormGroup } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import { Switch } from '@mui/material';
import { TEXT_FIELD } from '../../../style/constants';

const textFieldCommon = {
  paddingBottom: '1.5rem',
  '&>label': {
    fontSize: TEXT_FIELD.FONT_SIZE_MIDDLE,
    lineHeight: TEXT_FIELD.FONT_SIZE_MIDDLE,
  },
  '&>div': {
    height: TEXT_FIELD.HEIGHT_MIDDLE,
    '&>input': {
      fontSize: TEXT_FIELD.FONT_SIZE_MIDDLE,
    },
  },
};
const textField = (props) => css(props, {});
const weightField = (props) =>
  css(props, {
    paddingRight: '0.5rem',
  });
const memoField = (props) =>
  css(props, {
    width: '50rem',
  });
const isAerobicForm = css({
  display: 'inline',
  marginLeft: '0.5rem',
});
const isAerobicLabel = css({
  marginLeft: '0',
});

export const AnaerobicRecordForm = ({ setNum, errors = {}, refs = {} }) => {
  return (
    <div>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          label="重量"
          variant="outlined"
          css={weightField(textFieldCommon)}
          inputRef={refs.weightRef}
          type="number"
          id={`weight${setNum}`}
          InputProps={{ inputProps: { min: 0 } }}
        />
        <PulldownMenu
          itemList={['Kg', 'Lb']}
          refs={{ selectRef: refs.weightTypeRef }}
          name={`weightType${setNum}`}
          id={`weightType${setNum}`}
          defaultValue={'Kg'}
        />
      </Box>
      <p id={`weightError${setNum}`}>{errors.weightError}</p>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          label="回数"
          variant="outlined"
          css={textField(textFieldCommon)}
          inputRef={refs.repetitionRef}
          type="number"
          id={`repetition${setNum}`}
          InputProps={{ inputProps: { min: 0 } }}
        />
        <FormGroup css={isAerobicForm}>
          <FormControlLabel
            css={isAerobicLabel}
            control={<Switch id={`support${setNum}`} ref={refs.supportRef} />}
            label="補助"
            labelPlacement="start"
          />
        </FormGroup>
      </Box>
      <p id={`repetitionError${setNum}`}>{errors.repetitionError}</p>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          label="メモ"
          variant="outlined"
          css={memoField(textFieldCommon)}
          inputRef={refs.memoRef}
          type="text"
          id={`memo${setNum}`}
        />
      </Box>
      <p id={`memoError${setNum}`}>{errors.memoError}</p>
    </div>
  );
};
