import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Tab = ({ name, label, linkname, onClick, active }) => (
  <Menu.Item
    as={Link}
    to={linkname}
    name={name}
    content={label}
    active={active}
    onClick={() => onClick(name)}
  />
);

Tab.defaultProps = {
  active: false
};

Tab.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  linkname: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool,
};

export default Tab;
