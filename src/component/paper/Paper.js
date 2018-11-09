import React from 'react';

import './Paper.css';

const Paper = props => {
  //console.log("paper props...", props);
  //debugger
  let classes = 'paper-widget';
  if (props.className) {
    classes += ' ' + props.className;
  }
  return (
    <div className={classes}>
      <div className="paper-body">{props.children}</div>
    </div>
  );
};

export default Paper;
