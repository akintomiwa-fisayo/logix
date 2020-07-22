export const actionTypes = {
  SETTINGS_SET_INFO: 'SETTINGS_SET_INFO',
  SETTINGS_UPDATE_HEADER: 'SETTINGS_UPDATE_HEADER',
  SETTINGS_SOCIAL_UPDATE_HEADER: 'SETTINGS_SOCIAL_UPDATE_HEADER',
};

export const setInfo = (props) => ({ type: actionTypes.SETTINGS_SET_INFO, props });

export const updateHeader = (props) => ({ type: actionTypes.SETTINGS_UPDATE_HEADER, props });

export const updateSocialHeader = (props) => ({ type: actionTypes.SETTINGS_SOCIAL_UPDATE_HEADER, props });
