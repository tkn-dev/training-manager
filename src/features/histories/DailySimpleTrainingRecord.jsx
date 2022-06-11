/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { useSimpleRecordView } from './hooks/useSimpleRecordView';
import { TrainingRecordModal } from './TrainingRecordModal';
import { HOVER } from '../../style/constants';

const simpleRecordViewContainer = css({
  marginTop: '2rem',
  width: '90%',
  maxWidth: '50rem',
});
const hover = css({
  '&:hover': {
    backgroundColor: HOVER.COLOR,
    transition: HOVER.TRANSITION,
    borderRadius: HOVER.BORDER_RADIUS,
  },
})
const date = css({
  fontSize: '2rem',
  fontWeight: 'normal'
})

export const DailySimpleTrainingRecord = ({
  dailyRecordList,
  selectedDate,
  incrementModifyCount,
}) => {
  const [simpleRecordView, { updateRecordView }] = useSimpleRecordView();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    updateRecordView(dailyRecordList);
  }, [dailyRecordList]);

  return (
    <div css={simpleRecordViewContainer}>
      <section
        css={hover}
        onClick={() => {
          if (simpleRecordView.length) setOpenModal(true);
        }}
      >
        <h2 css={date}>{selectedDate}</h2>
        {simpleRecordView}
      </section>

      <TrainingRecordModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        selectedDate={selectedDate}
        incrementModifyCount={incrementModifyCount}
      />
    </div>
  );
};
