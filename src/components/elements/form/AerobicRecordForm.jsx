/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';
import { Box } from '@mui/material';
import { TextField } from '@mui/material';
import { PulldownMenu } from './PulldownMenu';
import { TEXT_FIELD } from '../../../style/constants';

const container = css({
  paddingTop: '1rem',
});
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
const distanceField = (props) =>
  css(props, {
    paddingRight: '0.5rem',
  });
const memoField = (props) =>
  css(props, {
    width: '50rem',
  });

export const AerobicRecordForm = ({ errors = {}, refs = {} }) => {
  return (
    <div>
      <Box css={container} component="form" noValidate autoComplete="off">
        <TextField
          label="距離"
          variant="outlined"
          css={distanceField(textFieldCommon)}
          inputRef={refs.distanceRef}
          type="number"
          name="distance1"
          id="distance1"
          InputProps={{ inputProps: { min: 0 } }}
          error={errors.distanceError ? true : false}
          helperText={errors.distanceError}
        />
        <PulldownMenu
          itemList={['Km', 'Mile']}
          refs={{ selectRef: refs.distanceTypeRef }}
          name={'distanceType1'}
          id={'distanceType1'}
          defaultValue={'Km'}
        />
      </Box>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          label="時間"
          variant="outlined"
          css={textField(textFieldCommon)}
          inputRef={refs.exerciseTimeRef}
          type="number"
          name="exerciseTime1"
          id="exerciseTime1"
          InputProps={{ inputProps: { min: 0 } }}
          error={errors.exerciseTimeError ? true : false}
          helperText={errors.exerciseTimeError}
        />
      </Box>
      <Box component="form" noValidate autoComplete="off">
        <TextField
          label="メモ"
          variant="outlined"
          css={memoField(textFieldCommon)}
          inputRef={refs.memoRef}
          type="text"
          name="memo1"
          id="memo1"
          error={errors.memoError ? true : false}
          helperText={errors.memoError}
        />
      </Box>
    </div>
  );
};
