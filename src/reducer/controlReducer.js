import { ALARM_ACTIVE, IS_MUTED, PANEL_ACTIVE, ACTIVE_MUSIC, IS_SHUFFLE } from "../action";

const INITIAL_STATE = {
  alarm: false,
  muted: false,
  shuffle: false,
  panelActive: false,
  activeMusic: 'Eternal-young',
};

const controlReducer = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
  case ALARM_ACTIVE:
    return { ...state, alarm: actions.alarm }

  case IS_MUTED:
    return { ...state, muted: actions.muted }

  case PANEL_ACTIVE:
    return { ...state, panelActive: actions.panelActive }

  case ACTIVE_MUSIC:
    return { ...state, activeMusic: actions.activeMusic }

  case IS_SHUFFLE:
    return { ...state, shuffle: actions.shuffle }

  default:
    return state;
  }

}

export default controlReducer;
