import React from 'react';

import './Loader.css';

/**
 * Loader component
 * @param { String } type: expected string values are 'hourglass' or 'roller'
 */
export class Loader extends React.Component {
  /**
   * Create loader component
   * @param { Object } props.type: string, expected values first, second
   */
  constructor(props) {
    super(props);
    //set loader type to default
    this.state = {
      type: this.props.type || 'hourglass',
    };
  }
  /**
   * Decide which html content to load based on loader type
   */
  loaderHtml() {
    //debugger
    switch (this.state.type.toLowerCase()) {
      case 'hourglass':
        return <div className="lds-hourglass" />;
      case 'roller':
        return (
          <div className="lds-roller">
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
        );
      default:
        return <h1>Loader type not loaded correctly</h1>;
    }
  }
  render() {
    return (
      <div className="app-loader">
        {//add loader content here
        this.loaderHtml()}
      </div>
    );
  }
}

export default Loader;
