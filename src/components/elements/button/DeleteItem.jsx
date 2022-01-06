import React from 'react';
import { MdDelete } from 'react-icons/md';
import PropTypes from 'prop-types';

export default function DeleteItem({ onClick }) {
  return <MdDelete onClick={onClick} />;
}

DeleteItem.propTypes = {
  onClick: PropTypes.func,
};

DeleteItem.defaultProps = {
  onClick: (f) => f,
};
