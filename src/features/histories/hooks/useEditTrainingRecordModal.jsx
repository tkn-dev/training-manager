/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useState, useCallback } from 'react';

const editModal = css({});

export const useEditTrainingRecordModal = () => {
  const showEditModal = (record) => {
    return;
  };

  return (
    <div css={editModal}>
      <p>種目名</p>
      <p>2022-04-05</p>
    </div>
  );
};
