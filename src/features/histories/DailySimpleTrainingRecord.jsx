/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useEffect } from 'react';
import { useSimpleRecordView } from './hooks/useSimpleRecordView';
import { useTrainingRecordModal } from './hooks/useTrainingRecordModal';

const simpleRecordViewContainer = css({
  maxWidth: '300px',
});

export const DailySimpleTrainingRecord = ({ dailyRecordList, selectedDate }) => {
  const [simpleRecordView, { updateRecordView }] = useSimpleRecordView();
  const [modalWindow, { openModal, updateModal }] = useTrainingRecordModal();

  useEffect(() => {
    updateRecordView(dailyRecordList);
  }, [dailyRecordList]);

  useEffect(() => {
    updateModal(selectedDate);
  }, [selectedDate]);

  return (
    <div css={simpleRecordViewContainer}>
      <section
        onClick={() => {
          if (simpleRecordView.length) openModal(selectedDate);
        }}
      >
        <h2>{selectedDate}</h2>
        {simpleRecordView}
      </section>

      {modalWindow}
    </div>
  );
};
