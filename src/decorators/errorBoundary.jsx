import React, { Component } from 'react';

const errorBoundary = WrappedComponent =>
  class ErrorBoundary extends Component {
    state = { error: null };

    componentDidCatch(error) {
      this.setState({ error });
    }

    render() {
      const { error } = this.state;

      if (error) {
        return <h1>Ошибка: {error.message}</h1>;
      }

      return <WrappedComponent {...this.props} />;
    }
  };

export default errorBoundary;
