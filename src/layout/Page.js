import React from 'react';
//redux
import { connect } from 'react-redux';
//router
import { BrowserRouter } from 'react-router-dom';
import AppRouter from '../router/AppRouter';
//local
import { Header, NavBar, Footer } from './index';
import { logGroup } from '../utils';
import './Page.scss';

/**
 * Page component defines app layout. It consist of 3 parts:
 * header component, app router and footer component
 * @param {Object} props received from redux
 */
const Page = props => {
  //debugger
  logGroup({
    title: 'Page',
    method: 'render',
    props: props,
  });
  return (
    <BrowserRouter>
      <React.Fragment>
        <Header
          appTitle={props.appTitle}
          pageTitle={props.pageTitle}
          languages={props.languages}
        />
        <NavBar />
        <section className="page-body">
          <AppRouter />
        </section>
        <Footer
          left={props.footerLeft}
          right={props.footerRight}
        />
      </React.Fragment>
    </BrowserRouter>
  );
};

/**
 * Redux connection to pass state to component
 * as properties
 * @param {*} state
 */
const mapStateToProps = state => {
  //debugger
  //get translations from i18n reducer
  let { data } = state.i18n.lang;
  if (data) {
    //debugger
    return {
      appTitle: data['Header.appTitle'],
      footerLeft: data['Footer.left'],
      footerRight: data['Footer.right'],
      languages: state.i18n.options,
      //this prop is dynamically updated by pages
      pageTitle: state.header.pageTitle,
    };
  } else {
    //debugger
    return {
      pageTitle: state.header.pageTitle,
      languages: state.i18n.options,
    };
  }
};

export default connect(mapStateToProps)(Page);
