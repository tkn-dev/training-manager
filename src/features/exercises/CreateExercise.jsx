import React from 'react';
import PropTypes from 'prop-types';

export default function CreateExercise({ onSubmit }) {
  return (
    <div>
      <label htmlFor="name">
        name
        <input type="text" name="name" id="name" />
      </label>
      <button
        type="submit"
        onClick={() => {
          const name = document.getElementById('name').value;
          onSubmit(name);
        }}
      >
        submit
      </button>
    </div>
  );
}

CreateExercise.propTypes = {
  onSubmit: PropTypes.func,
};

CreateExercise.defaultProps = {
  onSubmit: (f) => f,
};
