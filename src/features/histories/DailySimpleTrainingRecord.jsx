/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import useSimpleRecordView from './hooks/useSimpleRecordView';
import useTrainingRecordModal from './hooks/useTrainingRecordModal';

const simpleRecordViewContainer = css({
  maxWidth: '300px',
});

export default function DailySimpleTrainingRecord({ dailyRecordList, selectedDate }) {
  const [simpleRecordView, updateRecordView] = useSimpleRecordView();
  const [modalWindow, updateModal, openModal] = useTrainingRecordModal();

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
}

DailySimpleTrainingRecord.propTypes = {
  dailyRecordList: PropTypes.arrayOf(PropTypes.object),
  selectedDate: PropTypes.string,
};

DailySimpleTrainingRecord.defaultProps = {
  dailyRecordList: [],
  selectedDate: '',
};
