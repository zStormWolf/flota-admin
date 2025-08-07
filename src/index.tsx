import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Ultimate ResizeObserver error suppression
const suppressResizeObserverErrors = () => {
  // Override ResizeObserver to catch errors at source
  const OriginalResizeObserver = window.ResizeObserver;
  window.ResizeObserver = class extends OriginalResizeObserver {
    constructor(callback: ResizeObserverCallback) {
      super((entries, observer) => {
        try {
          callback(entries, observer);
        } catch (error) {
          // Silently ignore ResizeObserver errors
        }
      });
    }
  };

  // Suppress console errors
  const originalError = console.error;
  console.error = (...args) => {
    const message = args[0]?.toString() || '';
    if (message.includes('ResizeObserver') || 
        message.includes('loop completed') ||
        message.includes('undelivered notifications')) {
      return;
    }
    originalError.apply(console, args);
  };

  // Suppress window errors
  window.addEventListener('error', (e) => {
    if (e.message.includes('ResizeObserver') ||
        e.message.includes('loop completed') ||
        e.message.includes('undelivered notifications')) {
      e.stopImmediatePropagation();
      e.preventDefault();
      return false;
    }
  }, true);

  // Suppress unhandled promise rejections
  window.addEventListener('unhandledrejection', (e) => {
    const reason = e.reason?.toString() || '';
    if (reason.includes('ResizeObserver') ||
        reason.includes('loop completed') ||
        reason.includes('undelivered notifications')) {
      e.preventDefault();
    }
  });
};

suppressResizeObserverErrors();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
