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
  width: '100%',
  marginTop: '10px',
});
const formControllerContainer = css({
  display: 'flex',
  justifyContent: 'flex-start',
  width: '100%',
});
const anaerobicFormContainer = css({
  width: '100%',
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
          <h2>{`セット${setNum}`}</h2>
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
        exerciseList={[{ name: '' }, ...exerciseList]}
        errors={errors}
        setFullDate={(fullDate) => setRecordFormValue({ exercise_date: fullDate })}
        setExerciseName={(exerciseName) => setRecordFormValue({ exercise: exerciseName })}
      />
      <div css={formContainer}>{recordForm}</div>
      <div css={formControllerContainer}>
        <AddItem
          appendCss={buttonStyle.addItem}
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
        onClick={async () => {
          setError();
          setCurtValueList(getCurtValueList());
          const retErrors = validateRecordFormValues();
          if (retErrors.count == 0) {
            const res = await onSubmit(getRecordFormValueForPost());
            if (res.status == '201') {
              resetRecordFormValue();
              document.getElementById('exerciseNameList').value = '';
            }
          } else {
            setError(retErrors);
            return;
          }
        }}
      />
    </div>
  );
};
