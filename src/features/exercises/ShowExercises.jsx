import React from 'react';
import PropTypes from 'prop-types';
import DeleteItem from '../../components/elements/button/DeleteItem';

export default function ShowExercises({ exerciseList, onDelete }) {
  const iterateList = exerciseList.map((exercise, i) => (
    <li key={i.toString()}>
      <p>{`${i} ${exercise}`}</p>
      <DeleteItem onClick={() => onDelete(exercise)} />
    </li>
  ));

  return <ul>{iterateList}</ul>;
}

ShowExercises.propTypes = {
  exerciseList: PropTypes.arrayOf(PropTypes.string),
  onDelete: PropTypes.func,
};

ShowExercises.defaultProps = {
  exerciseList: [],
  onDelete: (f) => f,
};
