import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

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

export default Tab;
