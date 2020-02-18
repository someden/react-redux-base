import React from 'react';

import Portal from 'components/Portal';

const Popup = ({ onClose = () => {}, ...props }) => (
  <Portal>
    <div className='popup'>
      <button type='button' className='popup-close-bg' onClick={onClose} />
      <div className='popup-content'>
        <div className='popup-body' {...props} />
      </div>
    </div>
  </Portal>
);

export default Popup;
