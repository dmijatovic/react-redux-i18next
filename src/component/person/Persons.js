//REACT
import React from 'react';

//THIRD PARTY
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withNamespaces } from 'react-i18next';
//LOCAL
import * as actionType from '../../store/actions';
import './Persons.scss';
import AddPerson from './AddPerson';
import PersonCard from './PersonCard';
/**
 * Class Persons handles adding new persons
 * and displaying added persons in an card.
 * It depends on AddPerson and PersonCard
 * components.
 */
export class Persons extends React.Component {
  /**
   * Create persons content.
   * If persons array filled generate person cards per person
   * else show empty placeholder message.
   */
  getContent = () => {
    //create jsx content
    let jsx;
    let trans = this.props.t;
    if (this.props.persons.length > 0) {
      jsx = this.props.persons.map(p => {
        //debugger
        return (
          <PersonCard
            {...p}
            deletePerson={this.props.onDeletePerson}
            addedLabel={trans('PersonCard.addedLabel')}
            atLabel={trans('PersonCard.atLabel')}
            key={p.id}
          />
        );
      });
    } else {
      jsx = (
        <div className="persons-collection-empty">
          <p>{trans('Persons.ListEmptyMessage')}</p>
        </div>
      );
    }
    return jsx;
  };
  render() {
    let trans = this.props.t;
    return (
      <div className="persons">
        <AddPerson
          title={trans('AddPerson.title')}
          namePlaceholder={trans(
            'AddPerson.input.name.placeholder'
          )}
          agePlaceholder={trans(
            'AddPerson.input.age.placeholder'
          )}
          btnLabel={trans('AddPerson.btnLabel')}
          addPerson={this.props.onAddPerson}
        />
        <div className="persons-collection">
          {/* aestetic change - this header is excluded
            <h3 className="persons-collection-title">
              {this.props.personsListTitle}
            </h3>
          */}
          {this.getContent()}
        </div>
      </div>
    );
  }
}

//-------------- REDUX CONNECTION ---------------------

const mapStateToProps = state => {
  //debugger
  //get translations from i18n reducer
  let { data } = state.i18r.lang;
  if (data) {
    return {
      persons: state.persons,
      /*addPersonTitle: data['AddPerson.title'],
      addPersonInputNamePlaceholder:
        data['AddPerson.input.name.placeholder'],
      addPersonInputAgePlaceholder:
        data['AddPerson.input.age.placeholder'],
      addPersonBtnLabel: data['AddPerson.btnLabel'],
      personsListTitle: data['Persons.ListTitle'],
      personsListEmptyMessage: data['Persons.ListEmptyMessage'],
      personCardAddedLabel: data['PersonCard.addedLabel'],
      personCardAtLabel: data['PersonCard.atLabel'],*/
    };
  } else {
    return {
      persons: state.persons,
    };
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPerson: person => {
      //debugger
      return dispatch({
        type: actionType.ADD_PERSON,
        payload: person,
      });
    },
    onDeletePerson: id => {
      //debugger
      return dispatch({
        type: actionType.DELETE_PERSON,
        payload: id,
      });
    },
  };
};

//----------- EXPORT CONNECTED COMPONENT ------------
export default compose(
  withNamespaces(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Persons);
