//REACT
import React from 'react';
//REDUX
import { connect } from 'react-redux';

//LOCAL components
import { Loader, Persons } from '../component';
import { logGroup } from '../utils';
import * as actionType from '../store/actions';

import { NamespacesConsumer } from 'react-i18next';

/**
 * Home page
 */
import './Home.scss';
export class Home extends React.Component {
  /**
   * Display content based on loader state.
   * if loader show we return loader,
   * otherwise page content with persons
   */
  getContent = () => {
    //debugger
    if (this.props.loader.show) {
      return <Loader type={this.props.loader.type} />;
    } else {
      return (
        <section className="page-content">
          <Persons />
        </section>
      );
    }
  };
  render() {
    logGroup({
      title: 'Home',
      method: 'render',
      state: this.state,
      props: this.props,
    });
    //debugger;
    return (
      <React.Fragment>
        <div className="page-body-header">
          <NamespacesConsumer ns={['us']}>
            {(trans, { i18n, ready }) => {
              //debugger;
              console.log('NamespaceConsumer...', i18n);
              if (ready === true) {
                return <h2>{trans('Header.appTitle')}</h2>;
              } else {
                return <h2>translating...</h2>;
              }
            }}
          </NamespacesConsumer>
        </div>
        <p className="page-body-intro">
          {this.props.introText}
        </p>
        {this.getContent()}
      </React.Fragment>
    );
  }
  componentDidMount() {
    logGroup({
      title: 'Home',
      method: 'componentDidMount',
      state: this.state,
      props: this.props,
    });
    //first show loader
    this.props.onShowLoader();
    //change loader state after 2 seconds
    setTimeout(() => {
      //dispatch action to redux store
      //to hide loader
      this.props.onHideLoader();
    }, 2000);
  }
  componentDidUpdate() {
    logGroup({
      title: 'Home',
      method: 'componentDidUpdate',
      state: this.state,
      props: this.props,
    });
    //update page title in Header
    if (this.props.pageTitle) {
      this.props.setPageTitle(this.props.pageTitle);
    }
  }
}

//------------------- REDUX CONNECTION --------------------------
/**
 * Map redux store states to local component properties
 * @param state: object, redux store object
 */
const mapStateToProps = state => {
  //debugger
  //get translations from i18n reducer
  let { data } = state.i18n.lang;
  if (data) {
    return {
      pageTitle: data['Home.pageTitle'],
      introText: data['Home.introText'],
      loader: state.loader,
    };
  } else {
    return {
      loader: state.loader,
    };
  }
};
/**
 * Map redux dispatch actions to local component props
 * @param dispatch: function, redux dispatch function
 */
const mapDispatchToProps = dispatch => {
  return {
    //short ES6 fn notation (single line assumes return)
    onShowLoader: () =>
      dispatch({ type: actionType.SHOW_LOADER }),
    onHideLoader: () =>
      dispatch({ type: actionType.HIDE_LOADER }),
    setLoaderType: loaderType =>
      dispatch({
        type: actionType.SET_LOADER_TYPE,
        payload: loaderType,
      }),
    //long ES6 fn notation (needs return)
    setPageTitle: pageTitle => {
      return dispatch({
        type: actionType.SET_PAGE_TITLE,
        payload: pageTitle,
      });
    },
  };
};

/**
 * Export app class connected with Redux store
 * and props and discpatch actions mapped into
 * a local App component
 */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
