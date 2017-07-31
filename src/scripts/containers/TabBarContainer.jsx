import { connect } from 'react-redux';
import { TabBar } from '../components';
import { selectCurrentTab } from '../reducers';
import { selectTab } from '../actions/';

const mapState = (state) => {
  const currentTab = selectCurrentTab(state);
  return { currentTab };
};

const actions = { onTabClick: selectTab };

export default connect(mapState, actions)(TabBar);

