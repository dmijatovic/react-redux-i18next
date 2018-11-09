import React, { Component } from 'react';

import './Header.scss';

//import TransContext from '../context/TransContext';
import { logGroup } from '../utils';

/**
 * Page header
 * @param {string} props.title header title
 */
export class Header extends Component {
  render() {
    //console.log("Header props...", this.props);
    return (
      <header className="app-header">
        <section className="app-header-body">
          <div className="dflex ai-center">
            <div className="app-logo" />
            <h1 className="app-title">{this.props.appTitle}</h1>
          </div>
          <h2 className="app-page-title">
            {this.props.pageTitle}
          </h2>
        </section>
      </header>
    );
  }
  componentDidMount() {
    logGroup({
      title: 'Header',
      method: 'componentDidMount',
      props: this.props,
      context: this.context,
    });
  }
  componentDidUpdate() {
    logGroup({
      title: 'Header',
      method: 'componentDidUpdate',
      props: this.props,
      context: this.context,
    });
  }
}
//get context
//Header.contextType = TransContext;

export default Header;
