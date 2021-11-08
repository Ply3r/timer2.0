export const TIMER_ACTIVE = 'TIMER_ACTIVE';
export const ALARM_ACTIVE = 'ALARM_ACTIVE';
export const IS_MUTED = 'IS_MUTED';
export const PANEL_ACTIVE = 'PANEL_ACTIVE';
export const ACTIVE_MUSIC = 'ACTIVE_MUSIC';
export const CHANGE_TIME = 'CHANGE_TIME';
export const IS_SHUFFLE = 'IS_SHUFFLE';

export const changeTime = (minutes, seconds) => ({
  type: CHANGE_TIME,
  minutes,
  seconds,
})

export const timerActive = (isTimerActive) => ({
  type: TIMER_ACTIVE,
  isTimerActive,
})

export const alarmActive = (alarm) => ({
  type: ALARM_ACTIVE,
  alarm
})

export const isMuted = (muted) => ({
  type: IS_MUTED,
  muted
})

export const panelActive = (panelActive) => ({
  type: PANEL_ACTIVE,
  panelActive
})

export const activeMusic = (activeMusic) => ({
  type: ACTIVE_MUSIC,
  activeMusic
})

export const shuffleChange = (shuffle) => ({
  type: IS_SHUFFLE,
  shuffle,
})
