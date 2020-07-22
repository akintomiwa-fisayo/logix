export const actionTypes = {
  AUTH_LOGIN_SUCCESS: 'AUTH_LOGIN_SUCCESS',
  AUTH_SET_SESSION_USER: 'AUTH_SET_SESSION_USER',
  AUTH_CHNAGE_SIGN_UP: 'AUTH_CHNAGE_SIGN_UP',
  AUTH_CHNAGE_SIGN_UP_FORM: 'AUTH_CHNAGE_SIGN_UP_FORM',
};

export function changeSignUp(props) {
  return { type: actionTypes.AUTH_CHNAGE_SIGN_UP, props };
}

export function changeSignUpForm(props) {
  return { type: actionTypes.AUTH_CHNAGE_SIGN_UP_FORM, props };
}

export function loginSuccess() {
  return { type: actionTypes.AUTH_LOGIN_SUCCESS };
}

export function setSessionUser(user) {
  return { type: actionTypes.AUTH_SET_SESSION_USER, user };
}
