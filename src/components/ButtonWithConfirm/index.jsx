import React, { Component, Fragment } from 'react';

import Button from 'components/Button';
import ButtonWithLoader from 'components/ButtonWithLoader';
import Icon from 'components/Icon';
import Popup from 'components/Popup';

class ButtonWithConfirm extends Component {
  static defaultProps = {
    title: 'Удалить',
    color: 'light',
    className: 'text-danger',
    confirmMessage: 'Вы действительно хотите удалить?',
    confirmButtonText: 'Удалить',
    confirmButtonColor: 'danger',
    cancelButtonText: 'Отмена',
    children: <Icon name='close' fixedWidth />,
    onClick: () => {},
    onConfirm: () => {},
  };

  state = {
    showConfirmPopup: false,
  };

  isUnmounted = false;

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  handleClick = e => {
    this.toggleConfirmPopup();
    this.props.onClick(e);
  };

  handleConfirm = () =>
    Promise.resolve()
      .then(this.props.onConfirm)
      .then(this.toggleConfirmPopup);

  toggleConfirmPopup = () =>
    !this.isUnmounted &&
    this.setState(state => ({
      showConfirmPopup: !state.showConfirmPopup,
    }));

  render() {
    const {
      confirmMessage,
      confirmButtonText,
      confirmButtonColor,
      cancelButtonText,
      onClick,
      onConfirm,
      ...props
    } = this.props;
    const { showConfirmPopup } = this.state;

    return (
      <Fragment>
        <Button {...props} onClick={this.handleClick} />
        {showConfirmPopup ? (
          <Popup
            footer={
              <Fragment>
                <ButtonWithLoader color={confirmButtonColor} onClick={this.handleConfirm}>
                  {confirmButtonText}
                </ButtonWithLoader>
                <Button color='light' className='ml-1' onClick={this.toggleConfirmPopup}>
                  {cancelButtonText}
                </Button>
              </Fragment>
            }
            onClose={this.toggleConfirmPopup}
          >
            {confirmMessage}
          </Popup>
        ) : null}
      </Fragment>
    );
  }
}

export default ButtonWithConfirm;
