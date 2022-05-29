import React, { useEffect, useState } from 'react';
import { Submit } from '../../components/elements/button/Submit';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/material';
import { TextField } from '@mui/material';
import { FormGroup } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import { Switch } from '@mui/material';

const useStyles = makeStyles({
  box: {
    width: '80%',
    display: 'inline-flex',
  },
  exerciseNameField: {
    width: '100%',
    '&>*': {
      fontSize: '1.5rem',
    },
  },
  isAerobicGroup: {
    width: '10%',
    display: 'inline-flex',
    flexDirection: 'row',
    marginLeft: '10px',
  },
  isAerobicLabel: {
    marginLeft: '0',
    '&>*': {
      fontSize: '1.2rem',
    },
  },
  submit: {
    width: '90%',
    margin: '10px 0 30px',
    fontSize: '1.2rem',
  },
});

export const CreateExercise = ({ onSubmit = (f) => f }) => {
  const [result, setResult] = useState();
  const classes = useStyles();

  useEffect(() => {
    if (result === 201) {
      document.getElementById('exerciseName').value = '';
      document.getElementById('isAerobic').checked = false;
      setResult();
    }
  }, [result]);

  return (
    <div>
      <Box className={classes.box} component="form" noValidate autoComplete="off">
        <TextField
          className={classes.exerciseNameField}
          id="exerciseName"
          label="種目名"
          variant="outlined"
        />
      </Box>
      <FormGroup className={classes.isAerobicGroup}>
        <FormControlLabel
          className={classes.isAerobicLabel}
          control={<Switch id="isAerobic" />}
          label="有酸素"
          labelPlacement="start"
        />
      </FormGroup>
      <Submit
        value={'登録'}
        style={classes.submit}
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
