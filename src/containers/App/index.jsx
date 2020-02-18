import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Loader from 'components/Loader';
import errorBoundary from 'decorators/errorBoundary';
import { isAuthorized as isAuthorizedSelector } from 'models/auth/selectors';
import { getCurrentUser } from 'models/users';

import Layout from './Layout';
import Routes from './Routes';

const App = ({ isAuthorized, location, onLoad }) => {
  if (!isAuthorized) {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { pathToReferrer: location.pathname },
        }}
      />
    );
  }

  return (
    <Loader onLoad={onLoad}>
      <Layout>
        <Routes />
      </Layout>
    </Loader>
  );
};

const mapStateToProps = () => ({
  isAuthorized: isAuthorizedSelector(),
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(getCurrentUser()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(process.env.NODE_ENV === 'production' ? errorBoundary(App) : App);
