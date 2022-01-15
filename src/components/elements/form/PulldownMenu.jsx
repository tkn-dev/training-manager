import React from 'react';
import PropTypes from 'prop-types';

export default function PulldownMenu({ itemList, name, id }) {
  const option_list = itemList.map((item, i) => (
    <option key={i.toString()} value={item}>
      {item}
    </option>
  ));

  return (
    <select name={name} id={id}>
      {option_list}
    </select>
  );
}

PulldownMenu.propTypes = {
  itemList: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string,
  id: PropTypes.string,
};

PulldownMenu.defaultProps = {
  itemList: [],
  name: '',
  id: '',
};
