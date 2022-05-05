import React from 'react';
import { DeleteItem } from '../../components/elements/button/DeleteItem';

export const ShowExercises = ({ exerciseList = [], onDelete = (f) => f }) => {
  const iterateList = exerciseList.map((exercise, i) => (
    <li key={i.toString()}>
      <p>{`${i} ${exercise}`}</p>
      <DeleteItem onClick={() => onDelete(exercise)} />
    </li>
  ));

  return <ul>{iterateList}</ul>;
};
