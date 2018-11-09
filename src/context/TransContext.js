import React, { Component } from 'react';

//esling-disable-next-line
import { logGroup } from '../utils';
import cfg from '../store/app.cfg';

let I18n = React.createContext('test');

class TransContext extends Component {
  state = {
    lang: null,
    data: null,
  };
  /**
   * Get user language from localStorage
   * or default from store/app.cfg.js
   */
  getLanguage = () => {
    //debugger
    let l = localStorage.getItem('dv4all.app.lang');
    if (l) {
      return l;
    } else {
      return cfg.i18n.defaultLang;
    }
  };
  getTranslations = lang => {
    //debugger
    let lng = cfg.i18n.lang.filter(item => item.key === lang);

    if (lng) {
      let url = lng.data;
      fetch(url)
        .then(resp => {
          return resp.json();
        })
        .then(data => {
          this.setState({
            lang,
            data,
          });
        });
    } else {
      this.setState({
        lang: null,
        data: null,
      });
    }
  };
  render() {
    //debugger
    //let lang = this.getLanguage();
    //let data = this.getTranslations(lang);
    return (
      <I18n.Provider value={this.state}>
        {this.props.children}
      </I18n.Provider>
    );
  }
  componentDidMount() {
    logGroup({
      title: 'TransContext',
      method: 'componentDidMount',
      props: this.props,
      state: this.state,
      //context: this.context
    });
  }
  componentDidUpdate() {
    logGroup({
      title: 'TransContext',
      method: 'componentDidMount',
      props: this.props,
      state: this.state,
      //context: this.context
    });
  }
}

export default TransContext;
