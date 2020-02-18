import React, { Component } from 'react';

import Button from 'components/Button';
import Icon from 'components/Icon';

class ButtonWithLoader extends Component {
  static defaultProps = {
    disabled: false,
    messageOnLoading: <Icon name='spinner' pulse fixedWidth />,
    messageOnLoaded: <Icon name='check' fixedWidth />,
    onClick: () => {},
    children: null,
  };

  state = {
    loading: false,
    loaded: false,
  };

  isUnmounted = false;

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  handleLoad = () =>
    this.beforeLoading()
      .then(() => !this.isUnmounted && this.props.onClick())
      .then(() => !this.isUnmounted && this.afterLoading())
      .catch(error => {
        if (!this.isUnmounted) this.setState({ loading: false, loaded: false });
        throw error;
      });

  beforeLoading = () =>
    new Promise(resolve => this.setState({ loading: true, loaded: false }, resolve));

  afterLoading = () =>
    this.setState(
      {
        loading: false,
        loaded: true,
      },
      () => setTimeout(() => !this.isUnmounted && this.setState({ loaded: false }), 3000)
    );

  render() {
    const { disabled, messageOnLoading, messageOnLoaded, onClick, children, ...props } = this.props;
    const { loading, loaded } = this.state;

    return (
      <Button {...props} disabled={disabled || loading} onClick={this.handleLoad}>
        {loading ? messageOnLoading : null}
        {loaded ? messageOnLoaded : null}
        {!loading && !loaded ? children : null}
      </Button>
    );
  }
}

export default ButtonWithLoader;
