/* eslint-disable no-plusplus */
/* eslint-disable no-constant-condition */
/* eslint-disable no-labels */
/* eslint-disable no-restricted-syntax */
import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import * as firebase from 'firebase/app';

// Add the Firebase services that you want to use
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import Swal from 'sweetalert2';
import Layout from '../components/general/Layout';
import languageJSON from '../language';
import FormInput from '../components/general/FormInput';
import { parseQueryString } from '../lib/custom';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      lname: '',
      email: '',
      mobile: '',
      password: '',
      confPassword: '',
      refferalId: '', // <== get it from url

      fnameValid: true,
      lnameValid: true,
      mobileValid: true,
      emailValid: true,
      passwordValid: true,
      cnfPwdValid: true,
      pwdErrorMsg: '',
      allInfo: '',
      refferalIdValid: true,
      loading: false,

      usertype: 'user',
    };

    // this.signUp = this.signUp.bind(this);
    this.onPressRegister = this.onPressRegister.bind(this);
    this.validateFirstName = this.validateFirstName.bind(this);
    this.validateLastname = this.validateLastname.bind(this);
    this.validateMobile = this.validateMobile.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validateConfPassword = this.validateConfPassword.bind(this);
  }

  componentDidMount() {
    const firebaseConfig = {
      apiKey: 'AIzaSyCgk2I3xIWYSd5LFa-bAR7651DlB_KUe08',
      authDomain: 'logis-ef54f.firebaseapp.com',
      databaseURL: 'https://logis-ef54f.firebaseio.com',
      projectId: 'logis-ef54f',
      storageBucket: 'logis-ef54f.appspot.com',
      messagingSenderId: '980070107115',
      appId: '1:980070107115:web:14d5eb8f9436fab67b7bae',
      measurementId: 'G-KPM1YYDPL3',
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    const query = parseQueryString(window.location.href);
    console.log('our query', query);
    if (query.refferalId) {
      this.setState({ refferalId: query.refferalId });
    }
  }

  // register button press for validation
  onPressRegister() {
    const { state } = this;
    const fnameValid = this.validateFirstName();
    const lnameValid = this.validateLastname();
    const emailValid = this.validateEmail();
    const mobileValid = this.validateMobile();
    const passwordValid = this.validatePassword();
    const cnfPwdValid = this.validateConfPassword();

    if (!state.loading && fnameValid && lnameValid && emailValid && mobileValid && passwordValid && cnfPwdValid) {
      this.clickRegister(state.fname, state.lname, state.email, state.mobile, state.password);
    }
  }

  clickRegister(fname, lname, email, mobile, password) {
    this.setState({ loading: true });
    // console.log(firebase.auth().currentUser)
    // console.log("registration data===>",regData)
    //  Registration part
    firebase.auth().createUserWithEmailAndPassword(email, password).then((newUser) => {
      console.log('user created');
      if (newUser) {
        const databaseRef = firebase.database().ref();
        // get All users
        const userRoot = databaseRef.child('users/');
        let refferalVia = null;
        let flag = false;

        userRoot.once('value', (userData) => {
          const allUsers = userData.val();
          console.log('user validated');

          if (this.state.refferalId !== '') {
            for (const key in allUsers) {
              if (allUsers[key].refferalId) {
                console.log({ key: allUsers[key] });
                console.log({ state: this.state.refferalId.toLowerCase(), userKey: allUsers[key].refferalId });
                if (this.state.refferalId.toLowerCase() === allUsers[key].refferalId) {
                  flag = true;
                  refferalVia = {
                    userId: key,
                    refferalId: allUsers[key].refferalId,
                  };
                  console.log('found the guy', { flag, refferalVia });
                  break;
                }
              }
            }
          }
          const regData = {
            firstName: fname,
            lastName: lname,
            mobile,
            email,
            usertype: 'user',
            signupViaReferral: flag,
            referarDetails: refferalVia,
            createdAt: new Date().toISOString(),
          };

          console.log({ regData });
          firebase.auth().currentUser.updateProfile({
            displayName: `${regData.firstName} ${regData.lastName}`,
          }).then(() => {
            console.log('user updated');
            firebase.database().ref('users/').child(firebase.auth().currentUser.uid).set(regData)
              .then(() => {
                console.log('seems user was signed');
                // alert('registration complete');
                Swal.fire('Account created successfully', 'download Logix on Google Play Store and log in into you account', 'success');
                this.setState({
                  fname: '',
                  lname: '',
                  email: '',
                  mobile: '',
                  password: '',
                  confPassword: '',
                  // refferalId: '',
                  loading: false,
                });
              });
          });
        });
      }
    }).catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
      const { code } = error;

      const message = () => {
        switch (code) {
          case ('auth/email-already-in-use'):
            return 'Email is already in us';
          default
            : return 'Please try again';
        }
      };

      Swal.fire('Login Failed', message(), 'error');
      this.setState({ loading: false }, () => {
        console.log(languageJSON.email_exist_error, error);
      });
    });
  }

  // first name validation
  validateFirstName() {
    const { fname } = this.state;
    const fnameValid = fname.length > 0;
    this.setState({ fnameValid });
    return fnameValid;
  }

  validateLastname() {
    const { lname } = this.state;
    const lnameValid = lname.length > 0;
    this.setState({ lnameValid });
    return lnameValid;
  }

  // mobile number validation
  validateMobile() {
    const { mobile } = this.state;
    const mobileValid = (mobile.length > 0);
    this.setState({ mobileValid });
    return mobileValid;
  }

  // email validation
  validateEmail() {
    const { email } = this.state;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailValid = re.test(email);
    this.setState({ emailValid });
    return emailValid;
  }

  // password validation
  validatePassword() {
    const complexity = 'any';
    const { password } = this.state;
    const regx1 = /^([a-zA-Z0-9@*#]{8,15})$/;
    const regx2 = /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/;
    let passwordValid = password.length >= 1;
    if (complexity === 'any') {
      this.setState({ pwdErrorMsg: languageJSON.password_blank_messege });
    } else if (complexity === 'alphanumeric') {
      passwordValid = regx1.test(password);
      this.setState({ pwdErrorMsg: languageJSON.password_alphaNumeric_check });
    } else if (complexity === 'complex') {
      passwordValid = regx2.test(password);
      this.setState({ pwdErrorMsg: languageJSON.password_complexity_check });
    }
    this.setState({ passwordValid });
    return passwordValid;
  }

  // confirm password validation
  validateConfPassword() {
    const { password, confPassword } = this.state;
    const cnfPwdValid = (password === confPassword);
    this.setState({ cnfPwdValid });
    return cnfPwdValid;
  }

  render() {
    const { state, props } = this;
    const { header } = props.settings;
    const headerHeight = header.height;
    return (
      <>
        <Layout>
          <div id="mainContent" align="center" data-page="Home">
            <div className="banner container">
              <div className="overlay">
                <section className="content">
                  <h3>Create Account</h3>
                  <p>Logix is a special app built specifically for goods and materials delivery</p>
                </section>
              </div>
            </div>

            <div id="form">
              <div className="container">
                <div className="content">
                  <div className="fields">
                    <FormInput
                      label="First Name"
                      value={state.fname}
                      errorMessage={state.fnameValid ? null : languageJSON.first_name_blank_error}
                      onChange={(fname) => {
                        this.setState({ fname });
                      }}
                    />
                    <FormInput
                      label="Last Name"
                      value={state.lname}
                      errorMessage={state.lnameValid ? null : languageJSON.last_name_blank_error}
                      onChange={(lname) => {
                        this.setState({ lname });
                      }}
                    />
                    <FormInput
                      label="Email"
                      value={state.email}
                      errorMessage={state.emailValid ? null : languageJSON.valid_email_check}
                      onChange={(email) => {
                        this.setState({ email });
                      }}
                    />
                    <FormInput
                      label="mobile"
                      value={state.mobile}
                      errorMessage={state.mobileValid ? null : languageJSON.mobile_no_blank_error}
                      onChange={(mobile) => {
                        this.setState({ mobile });
                      }}
                    />
                    <FormInput
                      label="Password"
                      value={state.password}
                      type="password"
                      errorMessage={state.passwordValid ? null : this.state.pwdErrorMsg}
                      onChange={(password) => {
                        this.setState({ password });
                      }}
                    />

                    <FormInput
                      label="Confirm Password"
                      value={state.confPassword}
                      type="password"
                      errorMessage={state.cnfPwdValid ? null : languageJSON.confrim_password_not_match_err}
                      onChange={(confPassword) => {
                        this.setState({ confPassword });
                      }}
                    />
                  </div>
                  <div id="disclaimer">
                    By clicking Sign Up, you agree to our <Link href="/"><a>Terms</a></Link>, <Link href="/"><a>Privacy Policy</a></Link>.
                  </div>
                </div>
                <div className="content bottom">
                  <button
                    type="button"
                    className={`btn btn-success${state.loading ? ' disabled' : ''}`}
                    onClick={this.onPressRegister}
                  >Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  settings: state.settings,
});

export default connect(mapStateToProps)(Home);
