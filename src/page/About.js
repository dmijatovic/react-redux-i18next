//REACT
import React, { Component } from 'react';
//REDUX
import { connect } from 'react-redux';
import * as actionType from '../store/actions';

import { Loader, TextOnlySection } from '../component';
import { logGroup } from '../utils';
import './About.scss';

import { withNamespaces } from 'react-i18next';

class About extends Component {
  /**
   * Return the content for about page body.
   * If loader flag set returnes loader,
   * otherwise loops textSections array and
   * returns TextOnlySection components.
   */
  getContent = () => {
    //debugger
    let jsx;
    // if (this.props.loader.show) {
    //   jsx = <Loader type={this.props.loader.type} />;
    // } else if (this.props.textSections) {
    //   jsx = this.props.textSections.map((item, i) => {
    //     return (
    //       <TextOnlySection
    //         key={i}
    //         sectionTitle={item.sectionTitle}
    //         sectionText={item.sectionText}
    //       />
    //     );
    //   });
    // }
    //debugger;
    let { t } = this.props;
    jsx = <h1>{t('us:default.Header.appTitle')}</h1>;
    return jsx;
  };
  render() {
    return (
      <React.Fragment>
        <div className="page-body-header">
          <h2>{this.props.pageTitle}</h2>
        </div>
        <section className="about-page">
          {this.getContent()}
        </section>
      </React.Fragment>
    );
  }
  componentDidMount() {
    logGroup({
      title: 'About',
      method: 'componentDidMount',
      props: this.props,
    });
    //temp loader demo
    //remove in production :-)
    // this.props.dispatch({
    //   type: actionType.SHOW_LOADER,
    // });
    // //change loader state after 2 seconds
    // setTimeout(() => {
    //   //hide loader
    //   this.props.dispatch({
    //     type: actionType.HIDE_LOADER,
    //   });
    // }, 2000);
  }
  componentDidUpdate() {
    logGroup({
      title: 'About',
      method: 'componentDidUpdate',
      props: this.props,
    });
    //update page title in app header component
    if (this.props.pageTitle) {
      //debugger
      this.props.dispatch({
        type: actionType.SET_PAGE_TITLE,
        payload: this.props.pageTitle,
      });
    }
  }
}

// //-------------- REDUX CONNECTION ---------------------
// /**
//  * Map redux store states to local component properties
//  * @param state: object, redux store object
//  */

//  const mapStateToProps = state => {
//   //get translations from i18n reducer
//   let { data } = state.i18n.lang;
//   if (data) {
//     //debugger
//     return {
//       pageTitle: data['About.pageTitle'],
//       textSections: data['About.pageSections'],
//       loader: state.loader,
//     };
//   } else {
//     return {
//       loader: state.loader,
//     };
//   }
// };

// /**
//  * Connected class component
//  * If second function mapDispatchToProps is not passed
//  * dispatch function is automatically added to props
//  */
// export default connect(mapStateToProps)(About);

export default withNamespaces()(About);
