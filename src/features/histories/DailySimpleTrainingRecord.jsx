/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { useSimpleRecordView } from './hooks/useSimpleRecordView';
import { TrainingRecordModal } from './TrainingRecordModal';

const simpleRecordViewContainer = css({
  maxWidth: '400px',
});

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
        onClick={() => {
          if (simpleRecordView.length) setOpenModal(true);
        }}
      >
        <h2>{selectedDate}</h2>
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
