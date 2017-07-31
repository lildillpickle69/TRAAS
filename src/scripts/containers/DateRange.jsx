import { connect } from 'react-redux';
import { DateComponent } from '../components';
import { selectDates, selectFocus } from '../actions/';
import { selectStartDate, selectEndDate, selectFocusedInput } from '../reducers';

const mapStateToProps = (state) => {
  const startDate = selectStartDate(state);
  const endDate = selectEndDate(state);
  const focusedInput = selectFocusedInput(state);
  return { startDate, endDate, focusedInput };
};

const actions = {
  onFocusChange: selectFocus,
  onDatesChange: selectDates,
};

export default connect(mapStateToProps, actions)(DateComponent);

