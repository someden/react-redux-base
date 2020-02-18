import React from 'react';
import { connect } from 'react-redux';

import Popup from 'components/Popup';
import { deleteErrors, errorsArr } from 'models/errors';

const Errors = ({ errors, onClose }) => {
  if (!errors.length) return null;

  return (
    <Popup onClose={() => onClose()}>
      {errors.map((error, errorIndex) => (
        <p key={errorIndex}>{error.message}</p>
      ))}
    </Popup>
  );
};

export default connect(state => ({ errors: errorsArr(state) }), { onClose: deleteErrors })(Errors);
