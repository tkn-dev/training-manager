/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useCallback, useEffect, useState } from 'react';
import { deleteRecord } from '../../api/records';
import { AlertDialog } from '../../components/elements/notification/AlertDialog';
import { EditTrainingRecordModal } from './EditTrainingRecordModal';
import { useRecordSummary } from './hooks/useRecordSummary';

const overlay = css({
  position: 'fixed',
  zIndex: '3',
  top: '0',
  left: '0',
  height: '100%',
  width: '100%',
  backgroundColor: 'rgba(0, 0 ,0 ,0.3)',
});
const modal = css({
  position: 'absolute',
  zIndex: '3',
  top: '0',
  bottom: '0',
  right: '0',
  left: '0',
  height: '600px',
  width: '75%',
  margin: 'auto',
  backgroundColor: 'white',
  borderRadius: '2%',
});
const recordSummaryContainer = css({
  display: 'flex',
  flexWrap: 'nowrap',
  flexDirection: 'column',
  height: '570px',
  marginTop: '10px',
  overflow: 'scroll',
  borderTop: 'solid 1.5px lightgray',
  borderBottom: 'solid 1.5px lightgray',
});

export const TrainingRecordModal = ({
  openModal,
  setOpenModal,
  selectedDate,
  incrementModifyCount,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editTargetRecord, setEditTargetRecord] = useState({});
  const [deleteTargetRecord, setDeleteTargetRecord] = useState({});
  const [recordSummary, { createRecordSummary }] = useRecordSummary(
    setOpenDialog,
    setOpenEditModal,
    setEditTargetRecord,
    setDeleteTargetRecord,
  );

  const onClickOverlay = useCallback(() => {
    setOpenModal(false);
  });

  const closeDialog = useCallback(() => {
    setOpenDialog(false);
  });

  const rerenderHistories = useCallback(() => {
    incrementModifyCount();
    createRecordSummary(selectedDate);
  });

  const onDelete = useCallback(async () => {
    const res = await deleteRecord(deleteTargetRecord);
    if (res.status == '200') {
      rerenderHistories();
    }
    closeDialog();
  });

  useEffect(() => {
    createRecordSummary(selectedDate);
  }, [selectedDate]);

  if (openModal) {
    return (
      <div>
        <div css={overlay} onClick={() => onClickOverlay()}>
          <section
            css={modal}
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <h2>{selectedDate}</h2>
            <div css={recordSummaryContainer}>{recordSummary}</div>
          </section>
        </div>
        <EditTrainingRecordModal
          openEditModal={openEditModal}
          setOpenEditModal={setOpenEditModal}
          editTargetRecord={editTargetRecord}
          rerenderHistories={rerenderHistories}
        />
        <AlertDialog
          open={openDialog}
          title={'記録を削除しますか？'}
          onAgree={onDelete}
          onDisagree={closeDialog}
        />
      </div>
    );
  } else {
    return null;
  }
};
