import React from 'react';
import { connect } from 'react-redux';
import * as actionType from '../../store/actions';

const LanguageDropdown = props => {
  return (
    <select onChange={props.onLangChange}>
      {props.languages.map(item => {
        return (
          <option key={item.key} value={JSON.stringify(item)}>
            {item.label}
          </option>
        );
      })}
    </select>
  );
};

/**
 * Redux dispatch action connection
 * @param {function} dispatch
 */
const mapDispatchToProps = dispatch => {
  return {
    /**
     * On language change we pass selected i18n.options item (stringified)
     */
    onLangChange: e => {
      //parse JSON string back to object
      let ln = JSON.parse(e.target.value);
      dispatch({
        type: actionType.GET_LANGUAGE,
        payload: ln,
      });
    },
  };
};

/**
 * Redux state connection to component
 * @param {object} state
 */
const mapStateToProps = state => {
  //debugger
  let { key } = state.i18r.lang;

  if (key) {
    //language is loaded
    let selected = state.i18r.options.filter(
      item => item.key === key
    );
    return {
      languages: state.i18r.options,
      selected: JSON.stringify(selected),
    };
  } else {
    return {
      languages: state.i18r.options,
      selected: null,
    };
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageDropdown);
