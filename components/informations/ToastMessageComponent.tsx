import React from 'react';
import CustomToaster from '../shared/CustomToaster';

type ToastMessageProps = {
  showToast: boolean;
  success: boolean;
};

const ToastMessage: React.FC<ToastMessageProps> = ({ showToast, success }) => {
  if (!showToast) return null;

  return (
    <CustomToaster
      message={success ? 'Page Added to Bookmarks!' : ' Unable to Add Page to Bookmarks'}
      success={success}
    />
  );
};

export default ToastMessage;
