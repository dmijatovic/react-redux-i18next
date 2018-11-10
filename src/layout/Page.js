import React from 'react';
//redux
import { connect } from 'react-redux';
//router
import { BrowserRouter } from 'react-router-dom';
import AppRouter from '../router/AppRouter';
//i18n
import { NamespacesConsumer } from 'react-i18next';
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
      <NamespacesConsumer>
        {trans => (
          <React.Fragment>
            <Header
              appTitle={trans('Header.appTitle')}
              pageTitle={props.pageTitle}
              languages={props.languages}
            />
            <NavBar />
            <section className="page-body">
              <AppRouter />
            </section>
            <Footer
              left={trans('Footer.left')}
              right={trans('Footer.right')}
            />
          </React.Fragment>
        )}
      </NamespacesConsumer>
    </BrowserRouter>
  );
};

/**
 * Redux connection to pass state to component
 * as properties
 * @param {*} state
 */
const mapStateToProps = state => {
  //get translations from i18n reducer
  let { lang } = state.i18r;
  if (lang) {
    return {
      //language reducer with all info
      i18r: state.i18r,
      //list of languages - easy reference
      languages: state.i18r.options,
      //this prop is dynamically updated by pages
      pageTitle: state.header.pageTitle,
    };
  } else {
    //debugger
    return {
      pageTitle: state.header.pageTitle,
      languages: state.i18r.options,
    };
  }
};

export default connect(mapStateToProps)(Page);
