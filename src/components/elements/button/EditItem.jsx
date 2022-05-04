/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';
import { MdEdit } from 'react-icons/md';
import PropTypes from 'prop-types';

export default function EditItem({ onClick }) {
  return <MdEdit onClick={onClick} />;
}

EditItem.propTypes = {
  onClick: PropTypes.func,
};

EditItem.defaultProps = {
  onClick: (f) => f,
};
