import React from 'react';

const TextOnlySection = props => {
  return (
    <React.Fragment>
      <h2 className="section-header">{props.sectionTitle}</h2>
      <p className="section-text">{props.sectionText}</p>
    </React.Fragment>
  );
};

export default TextOnlySection;
