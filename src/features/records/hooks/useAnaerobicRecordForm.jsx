/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AnaerobicRecordForm from '../../components/elements/form/AnaerobicRecordForm';
import AddItem from '../../components/elements/button/AddItem';
import RemoveItem from '../../components/elements/button/RemoveItem';

const formContainer = css({
  display: 'flex',
  flexWrap: 'wrap',
  width: '100%',
  marginTop: '10px',
});
const anaerobicFormContainer = css({
  width: '100%',
});

export default function useAnaerobicRecordForm() {
  const [anaerobicRecordForm, setAnaerobicRecordForm] = useState();

  const createAnaerobicRecordFormEachSet = (setNum) => {
    return (
      <div key={setNum} css={anaerobicFormContainer}>
        <h2>{`セット${setNum}`}</h2>
        <AnaerobicRecordForm setNum={setNum} />
      </div>
    );
  };

  const createAnaerobicRecordForm = (setNum) => {
    const form = [...Array(selectedSetNum)].map((_, i) => {
      return createAnaerobicRecordFormEachSet(i + 1);
    });

    setAnaerobicRecordForm(
      <div css={formContainer}>
        {form}
        <div>
          <AddItem onClick={() => addForm()} />
          <RemoveItem onClick={() => removeForm()} />
        </div>
      </div>,
    );
  };

  const addForm = () => {};

  const removeForm = () => {};

  return [anaerobicRecordForm, createAnaerobicRecordForm];
}
