import { actionTypes } from './action';

export const initState = {
  user: false,
  signUp: {
    form: {
      firstName: '',
      firstNameError: false,
      lastName: '',
      lastNameError: false,
      email: '',
      emailError: false,
      mobileNumber: '',
      mobileNumberError: false,
      dateOfBirth: '',
      dateOfBirthError: false,
      countryId: '',
      countryIdError: false,
      stateId: '',
      stateIdError: false,
      cityId: '',
      cityIdError: false,
      termsAgree: false,
      termsAgreeError: false,
    },
    regId: '',
    statesOptions: false,
    citiesOptions: false,
    submitting: false,
  },
};

function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        ...{ isLoggedIn: true },
      };
    case actionTypes.AUTH_SET_SESSION_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.AUTH_CHNAGE_SIGN_UP:
      return {
        ...state,
        signUp: {
          ...state.signUp,
          ...action.props,
        },
      };
    case actionTypes.AUTH_CHNAGE_SIGN_UP_FORM:
      return {
        ...state,
        signUp: {
          ...state.signUp,
          form: {
            ...state.signUp.form,
            ...action.props,
          },
        },
      };
    default:
      return state;
  }
}

export default reducer;
