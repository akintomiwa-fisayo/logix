import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Footer from './Footer';

class Layout extends React.Component {
  render() {
    const { props } = this;
    const { children } = props;
    return (
      <>
        <Header />
        <main className="">
          {children}
        </main>
        <Footer />
      </>
    );
  }
}
const mapStateToProps = (state) => ({ settings: state.settings });
const mapDispatchToProps = (dispatch) => ({
  // updateHeader: (props) => dispatch(updateHeader(props)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
