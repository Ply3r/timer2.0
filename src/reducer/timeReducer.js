import { TIMER_ACTIVE, CHANGE_TIME } from '../action';

const INITIAL_STATE = {
  minutes: '5',
  seconds: '0',
  isTimerActive: false,
};

const timeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TIMER_ACTIVE:
    return { ...state, isTimerActive: action.isTimerActive }

  case CHANGE_TIME:
    return { ...state, minutes: action.minutes, seconds: action.seconds }

  default:
    return state;
  }
}

export default timeReducer;