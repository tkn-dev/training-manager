/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { Submit } from '../../components/elements/button/Submit';
import { Box } from '@mui/material';
import { TextField } from '@mui/material';
import { FormGroup } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import { Switch } from '@mui/material';
import { TEXT_FIELD } from '../../style/constants';

const box = css({
  width: '80%',
  display: 'inline-flex',
});
const exerciseNameField = css({
  width: '100%',
  '&>label': {
    lineHeight: TEXT_FIELD.FONT_SIZE_LARGE,
    lineHeight: TEXT_FIELD.FONT_SIZE_LARGE,
  },
  '&>div': {
    height: TEXT_FIELD.HEIGHT_LARGE,
    '&>input': {
      fontSize: TEXT_FIELD.FONT_SIZE_LARGE,
    },
  },
});
const isAerobicGroup = css({
  width: '10%',
  display: 'inline-flex',
  flexDirection: 'row',
  marginLeft: '10px',
});
const isAerobicLabel = css({
  marginLeft: '0',
  '&>*': {
    fontSize: '1.2rem',
  },
});
const submit = css({
  width: '90%',
  margin: '10px 0 30px',
  fontSize: '1.2rem',
});

export const CreateExercise = ({ onSubmit = (f) => f }) => {
  const [result, setResult] = useState();

  useEffect(() => {
    if (result === 201) {
      document.getElementById('exerciseName').value = '';
      document.getElementById('isAerobic').checked = false;
      setResult();
    }
  }, [result]);

  return (
    <div>
      <Box css={box} component="form" noValidate autoComplete="off">
        <TextField css={exerciseNameField} id="exerciseName" label="種目名" variant="outlined" />
      </Box>
      <FormGroup css={isAerobicGroup}>
        <FormControlLabel
          css={isAerobicLabel}
          control={<Switch id="isAerobic" />}
          label="有酸素"
          labelPlacement="start"
        />
      </FormGroup>
      <Submit
        value={'登録'}
        appendCss={submit}
        onClick={() => {
          const exercise = {
            name: document.getElementById('exerciseName').value,
            is_aerobic: document.getElementById('isAerobic').checked,
          };
          onSubmit(exercise).then(async (res) => setResult(res.status));
        }}
      />
    </div>
  );
};
