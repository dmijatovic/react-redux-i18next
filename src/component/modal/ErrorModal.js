import React from 'react';

import './ErrorModal.css';

const ErrorModal = error => {
  function loadContent() {
    return (
      <p>This is basic sample content of error message body.</p>
    );
  }
  return (
    <section>
      <div className="modal-backdrop">
        <div className="modal-card">
          <div className="modal-header">
            <h1 className="modal-title">{error.title}</h1>
            <div className="modal-nav">
              <button className="btn btn-xs">Close</button>
            </div>
          </div>
          <div className="modal-body">{loadContent()}</div>
        </div>
      </div>
    </section>
  );
};

export default ErrorModal;
