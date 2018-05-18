import React from 'react';
import { Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Tab from './Tab';

const TabBar = (props) => {
  const { tabs, currentTab, onTabClick, ...otherProps } = props;
  const tabItems = tabs.map((tabInfo) => {
    const { name, label, linkname } = tabInfo;
    return (
      <Tab
        key={name}
        linkname={linkname}
        name={name}
        label={label}
        active={currentTab === name}
        onClick={onTabClick}
      />
    );
  });
  return (
    <div>
      <Menu tabular fluid {...otherProps}>
        {tabItems}
        <Menu.Item
          href="https://aerolink.aero.org/cs/llisapi.dll?func=ll&objaction=overview&objid=39516303"
          target="_blank"
        >User Guide
        </Menu.Item>
      </Menu>
    </div>
  );
};

TabBar.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentTab: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired
};

export default TabBar;
