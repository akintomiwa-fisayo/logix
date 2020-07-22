import { actionTypes } from './action';

export const initState = {
  header: {
    height: 0,
    fixed: false,
    fixedTop: null,
  },
  socialHeader: {
    height: 0,
  },
};

function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.SETTINGS_SET_INFO:
      return {
        ...state,
        ...action.props,
      };
    case actionTypes.SETTINGS_UPDATE_HEADER:
      return {
        ...state,
        header: {
          ...state.header,
          ...action.props,
        },
      };
    case actionTypes.SETTINGS_SOCIAL_UPDATE_HEADER:
      return {
        ...state,
        socialHeader: {
          ...state.socialHeader,
          ...action.props,
        },
      };
    default:
      return state;
  }
}

export default reducer;
