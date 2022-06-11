/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { useRecordFormValue } from './hooks/useRecordFormValue';
import { useRecordFormRef } from './hooks/useRecordFormRef';
import { useSetFormControl } from './hooks/useSetFormControl';
import { SelectExerciseForm } from '../../components/elements/form/SelectExerciseForm';
import { AerobicRecordForm } from '../../components/elements/form/AerobicRecordForm';
import { AnaerobicRecordForm } from '../../components/elements/form/AnaerobicRecordForm';
import { AddItem } from '../../components/elements/button/AddItem';
import { RemoveItem } from '../../components/elements/button/RemoveItem';
import { Submit } from '../../components/elements/button/Submit';
import { useRecordFormErrorMessage } from './hooks/useRecordFormErrorMessage';

const container = css({
  display: 'flex',
  flexWrap: 'wrap',
});
const formContainer = css({
  display: 'flex',
  flexWrap: 'wrap',
  height: '39rem',
  width: '60rem',
  marginTop: '1rem',
  marginLeft: '3rem',
  overflowY: 'scroll',
});
const formControllerContainer = css({
  display: 'flex',
  justifyContent: 'flex-start',
  width: '100%',
  marginLeft: '3rem',
});
const anaerobicFormLabel = css({
  marginBottom: '1.5rem',
  fontSize: '1.2rem',
});
const anaerobicFormContainer = css({
  width: '100%',
});
const submit = css({
  marginTop: '1.5rem',
  marginLeft: '3rem',
  width: '7rem',
});

export const CreateRecord = ({ exerciseList = [], onSubmit = (f) => f }) => {
  const [recordForm, setRecordForm] = useState();
  const [
    recordFormValues,
    {
      setRecordFormValue,
      setCurtValueList,
      validateRecordFormValues,
      resetRecordFormValue,
      getRecordFormValueForPost,
    },
  ] = useRecordFormValue();
  const [refList, { getCurtValueList }] = useRecordFormRef();
  const [errors, { setError }] = useRecordFormErrorMessage();
  const setSetNum = (setNum) => setRecordFormValue({ set_number: setNum });
  const [buttonStyle, setFormController] = useSetFormControl(
    recordFormValues.set_number,
    setSetNum,
  );

  const createInputForm = (formNum) => {
    return [...Array(formNum)].map((_, i) => {
      const setNum = i + 1;
      return (
        <div key={setNum} css={anaerobicFormContainer}>
          <h2 css={anaerobicFormLabel}>{`セット${setNum}`}</h2>
          <AnaerobicRecordForm
            setNum={setNum}
            refs={{
              weightRef: refList[`set${setNum}`].weight,
              weightTypeRef: refList[`set${setNum}`].weightType,
              repetitionRef: refList[`set${setNum}`].repetition,
              memoRef: refList[`set${setNum}`].memo,
              supportRef: refList[`set${setNum}`].isSupported,
            }}
            errors={errors[`set${setNum}`]}
          />
        </div>
      );
    });
  };

  // 有酸素フラグ切替
  useEffect(() => {
    if (!exerciseList || !recordFormValues.exercise) {
      setRecordFormValue({ is_aerobic: null });
    } else {
      setRecordFormValue({
        is_aerobic: exerciseList.find((exercise) => exercise.name === recordFormValues.exercise)
          .is_aerobic,
      });
    }
  }, [recordFormValues.exercise]);

  // 有酸素フラグ更新時フォーム切替処理
  useEffect(() => {
    if (!recordFormValues.exercise) {
      setRecordForm();
      setFormController.disable();
    } else if (recordFormValues.is_aerobic) {
      setRecordForm(
        <AerobicRecordForm
          refs={{
            distanceRef: refList['set1'].distance,
            distanceTypeRef: refList['set1'].distanceType,
            exerciseTimeRef: refList['set1'].exerciseTime,
            memoRef: refList['set1'].memo,
          }}
          errors={errors.set1}
        />,
      );
      setFormController.disable();
    } else {
      setRecordForm(createInputForm(recordFormValues.set_number));
      setFormController.enable();
    }
  }, [recordFormValues.is_aerobic, errors]);

  // フォーム増減
  useEffect(() => {
    if (recordFormValues.exercise && !recordFormValues.is_aerobic) {
      setRecordForm(createInputForm(recordFormValues.set_number));
      setFormController.updateButtonStyle();
    }
  }, [recordFormValues.set_number]);

  return (
    <div css={container}>
      <SelectExerciseForm
        currentDate={new Date()}
        exerciseList={exerciseList}
        errors={errors}
        setFullDate={(fullDate) => setRecordFormValue({ exercise_date: fullDate })}
        setExerciseName={(exerciseName) => setRecordFormValue({ exercise: exerciseName })}
      />
      <div css={formContainer}>{recordForm}</div>
      <div css={formControllerContainer}>
        <AddItem
          appendCss={css(buttonStyle.addItem, { marginRight: '10px' })}
          onClick={() => {
            if (recordFormValues.is_aerobic != null && !recordFormValues.is_aerobic)
              setFormController.add();
          }}
        />
        <RemoveItem
          appendCss={buttonStyle.removeItem}
          onClick={() => {
            if (recordFormValues.is_aerobic != null && !recordFormValues.is_aerobic)
              setFormController.remove();
          }}
        />
      </div>
      <Submit
        value="登録"
        onClick={async () => {
          setError();
          setCurtValueList(getCurtValueList());
          const retErrors = validateRecordFormValues();
          if (retErrors.count == 0) {
            const res = await onSubmit(getRecordFormValueForPost());
            if (res.status == '201') {
              resetRecordFormValue(1);
              document.getElementById('exerciseNameList').value = '';
            }
          } else {
            setError(retErrors);
            return;
          }
        }}
        appendCss={submit}
      />
    </div>
  );
};
