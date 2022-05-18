/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useCallback, useEffect, useState } from 'react';
import { updateRecord } from '../../api/records';
import { AddItem } from '../../components/elements/button/AddItem';
import { RemoveItem } from '../../components/elements/button/RemoveItem';
import { Submit } from '../../components/elements/button/Submit';
import { AerobicRecordForm } from '../../components/elements/form/AerobicRecordForm';
import { AnaerobicRecordForm } from '../../components/elements/form/AnaerobicRecordForm';
import { SelectExerciseForm } from '../../components/elements/form/SelectExerciseForm';
import { useRecordFormErrorMessage } from '../records/hooks/useRecordFormErrorMessage';
import { useRecordFormRef } from '../records/hooks/useRecordFormRef';
import { useRecordFormValue } from '../records/hooks/useRecordFormValue';
import { useSetFormControl } from '../records/hooks/useSetFormControl';

const overlay = css({
  position: 'fixed',
  zIndex: '4',
  top: '0',
  left: '0',
  height: '100%',
  width: '100%',
  backgroundColor: 'rgba(0, 0 ,0 ,0.3)',
});
const modal = css({
  position: 'absolute',
  zIndex: '4',
  top: '0',
  bottom: '0',
  right: '0',
  left: '0',
  height: '500px',
  width: '60%',
  margin: 'auto',
  backgroundColor: 'white',
  borderRadius: '2%',
});
const formContainer = css({
  display: 'flex',
  flexWrap: 'nowrap',
  flexDirection: 'column',
  height: '350px',
  width: '100%',
  marginTop: '10px',
  overflow: 'scroll',
  borderTop: 'solid 1.5px lightgray',
  borderBottom: 'solid 1.5px lightgray',
});
const formControllerContainer = css({
  display: 'flex',
  justifyContent: 'flex-start',
  width: '100%',
});
const anaerobicFormContainer = css({
  width: '100%',
});

export const EditTrainingRecordModal = ({
  openEditModal,
  setOpenEditModal,
  editTargetRecord,
  rerenderHistories,
}) => {
  const [recordForm, setRecordForm] = useState();
  const [errors, { setError }] = useRecordFormErrorMessage();
  const [refList, { getCurtValueList, setRefValues }] = useRecordFormRef();
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
  const setSetNum = (setNum) => setRecordFormValue({ set_number: setNum });
  const [buttonStyle, setFormController] = useSetFormControl(
    recordFormValues.set_number,
    setSetNum,
  );

  const onClickOverlay = useCallback(() => {
    setOpenEditModal(false);
    setError();
  });

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

  // モーダル初期化処理・再描画処理
  useEffect(() => {
    if (!editTargetRecord.exercise) return;
    setRecordFormValue({
      exercise_date: editTargetRecord.exercise_date,
      exercise: editTargetRecord.exercise,
      is_aerobic: editTargetRecord.Exercise.is_aerobic,
      set_number: editTargetRecord.maxSetNum,
    });
    if (editTargetRecord.Exercise.is_aerobic) {
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
  }, [openEditModal, errors]);

  // 処理対象レコードのフォームへの反映処理
  useEffect(() => {
    if (errors.count > 0) return;
    if (!editTargetRecord.maxSetNum) return;
    setRefValues(editTargetRecord);
  }, [recordForm]);

  // フォーム増減処理
  useEffect(() => {
    if (recordFormValues.exercise && !recordFormValues.is_aerobic) {
      setRecordForm(createInputForm(recordFormValues.set_number));
      setFormController.updateButtonStyle();
    }
  }, [recordFormValues.set_number]);

  if (openEditModal) {
    return (
      <div>
        <div css={overlay} onClick={() => onClickOverlay()}>
          <section
            css={modal}
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <h2>記録編集</h2>
            <SelectExerciseForm
              currentDate={new Date(editTargetRecord.exercise_date)}
              exerciseList={[{ name: editTargetRecord.exercise }]}
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
                  const record = getRecordFormValueForPost();
                  for (let i = 0; i < record.length; i++) {
                    record[i].recorded_at = editTargetRecord.recorded_at;
                  }
                  const res = await updateRecord(record);
                  if (res.status == '201') {
                    resetRecordFormValue();
                    rerenderHistories();
                    setOpenEditModal(false);
                  }
                } else {
                  setError(retErrors);
                  return;
                }
              }}
            />
          </section>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
