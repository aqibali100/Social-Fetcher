// components/ui/Toast.tsx

import React, { useState, useEffect } from 'react';

export interface ToastProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div style={styles.toast}>
      <p>{message}</p>
      <button onClick={onClose} style={styles.closeButton}>
        &times;
      </button>
    </div>
  );
};

const styles = {
  toast: {
    position: 'fixed' as 'fixed',
    top: '20px',
    right: '20px',
    padding: '10px 20px',
    backgroundColor: '#333',
    color: 'white',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    zIndex: 9999,
  },
  closeButton: {
    marginLeft: '10px',
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '20px',
    cursor: 'pointer',
  },
};
