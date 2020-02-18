import { Component } from 'react';
import { createPortal } from 'react-dom';

const portalRoot = document.getElementById('portal');

class Portal extends Component {
  el = document.createElement('div');

  componentDidMount() {
    portalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    portalRoot.removeChild(this.el);
  }

  render() {
    return createPortal(this.props.children, this.el);
  }
}

export default Portal;
