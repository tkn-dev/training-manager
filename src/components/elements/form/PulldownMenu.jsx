import React from 'react';
import PropTypes from 'prop-types';

export default function PulldownMenu({
  itemList,
  name,
  id,
  defaultValue,
  onChange,
}) {
  const option_list = itemList.map((item, i) => (
    <option key={i.toString()} value={item}>
      {item}
    </option>
  ));

  return (
    <select name={name} id={id} defaultValue={defaultValue} onChange={onChange}>
      {option_list}
    </select>
  );
}

PulldownMenu.propTypes = {
  itemList: PropTypes.arrayOf(PropTypes.any),
  name: PropTypes.string,
  id: PropTypes.string,
  defaultValue: PropTypes.any,
  onChange: PropTypes.func,
};

PulldownMenu.defaultProps = {
  itemList: [],
  name: '',
  id: '',
  defaultValue: '',
  onChange: (f) => f,
};
