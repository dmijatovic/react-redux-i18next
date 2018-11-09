import React from 'react';
import { connect } from 'react-redux';
import * as actionType from '../../store/actions';

import './LanguageButtons.scss';

const LanguageButtons = props => {
  return (
    <div className="language-options">
      {props.selectLabel}
      {props.languages.map((item, pos) => {
        //calculate classes
        //debugger
        let classes = 'language-option',
          id = `lang-input-${item.key}`;
        if (props.selected === item.key) {
          classes += ' selected';
        }
        return (
          <div key={item.key} className={classes}>
            <input
              id={id}
              type="radio"
              name="language"
              value={JSON.stringify(item)}
              onChange={props.onLangChange}
              checked={props.selected === item.key}
            />
            <label htmlFor={id}>
              <img
                className="language-option-flag"
                src={item.icon}
                alt={item.label}
                title={item.label}
              />
              {/* item.label */}
            </label>
          </div>
        );
      })}
    </div>
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
  let { key, data } = state.i18n.lang;
  if (key) {
    //language is loaded
    return {
      languages: state.i18n.options,
      selected: key,
      selectLabel: data['Language.selectLabel'],
    };
  } else {
    return {
      languages: state.i18n.options,
      selected: null,
    };
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageButtons);
